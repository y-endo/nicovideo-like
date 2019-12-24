import React from 'react';
import PropTypes from 'prop-types';

import CommentList from './CommentList';
import CommentForm from './CommentForm';
import CommentCanvas from './CommentCanvas';
import PlayerControl from './PlayerControl';

import YouTubeIframeAPI from '@/utility/YouTubeIframeAPI';
import FirestoreManager from '@/utility/FirestoreManager';

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFirstPlay: false,
      isReady: false
    };

    this.timeFormat = 'mm:ss';
    this.commentCanvas = React.createRef();
    this.playerControl = React.createRef();
  }

  render() {
    return (
      <div className="player-container">
        <div className="player-area">
          <div className="player-wrap">
            <CommentCanvas ref={this.commentCanvas} getCurrentTime={this.getCurrentTime.bind(this)} comments={this.props.watch.comments} />
            <div id="player"></div>
          </div>
          <PlayerControl
            playVideo={this.playVideo.bind(this)}
            pauseVideo={this.pauseVideo.bind(this)}
            seekTo={this.seekTo.bind(this)}
            getDuration={this.getDuration.bind(this)}
            getCurrentTime={this.getCurrentTime.bind(this)}
            ref={this.playerControl}
            timeFormat={this.timeFormat}
          />
          <CommentForm getCurrentTime={this.getCurrentTime.bind(this)} postComment={this.props.postComment} videoId={this.props.match.params.id} />
        </div>
        <div className="comments">
          <CommentList comments={this.props.watch.comments} getCurrentTime={this.getCurrentTime.bind(this)} timeFormat={this.timeFormat} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    YouTubeIframeAPI.ready().then(() => {
      this.player = new YT.Player('player', {
        width: '1920',
        height: '1080',
        videoId: this.props.match.params.id,
        playerVars: {
          enablejsapi: 1,
          fs: 0, // 全画面禁止
          playsinline: 1,
          iv_load_policy: 3,
          controls: 0,
          modestbranding: 1
          // disablekb: 1
        },
        events: {
          onReady: this.handlePlayerReady.bind(this),
          onStateChange: this.handleStateChange.bind(this)
        }
      });
    });

    FirestoreManager.getData(this.props.match.params.id).then(data => {
      if (data && data.comments) this.props.loadComments(data.comments);
    });
  }

  componentWillUnmount() {
    this.props.loadComments([]);
  }

  handlePlayerReady() {
    this.setState({ isReady: true });

    const duration = this.getDuration();
    if (duration >= 36000) {
      this.timeFormat = 'HH:mm:ss';
    } else if (duration >= 3600) {
      this.timeFormat = 'H:mm:ss';
    } else {
      this.timeFormat = 'mm:ss';
    }

    this.playerControl.current.setDuration();
  }

  handleStateChange(event) {
    switch (event.data) {
      case -1:
        // 未開始
        this.commentCanvas.current.pauseTimeline();
        break;
      case 0:
        // 終了
        this.commentCanvas.current.pauseTimeline();
        break;
      case 1:
        // 再生中
        this.commentCanvas.current.playTimeline();
        break;
      case 2:
        // 一時停止
        this.commentCanvas.current.pauseTimeline();
        break;
      case 3:
        // バッファリング中
        this.commentCanvas.current.pauseTimeline();
        break;
      case 5:
        // 頭出し済み
        break;
    }

    if (event.data === 1 && !this.state.isFirstPlay) {
      this.setState({ isFirstPlay: true });
      this.playerControl.current.setDuration();
      this.playerControl.current.setCurrentTime();
    }
  }

  getDuration() {
    if (!this.state.isReady) return -1;
    return this.player.getDuration();
  }

  getCurrentTime() {
    if (!this.state.isReady) return -1;
    if (this.player.getPlayerState() === 0) return this.getDuration();
    return this.player.getCurrentTime();
  }

  playVideo() {
    if (!this.state.isReady) return;
    this.player.playVideo();
  }

  pauseVideo() {
    if (!this.state.isReady) return;
    this.player.pauseVideo();
  }

  seekTo(seconds) {
    if (!this.state.isReady) return;
    this.player.seekTo(seconds);
    this.commentCanvas.current.seekTimeline(seconds);
  }
}

Player.propTypes = {
  match: PropTypes.object.isRequired,
  postComment: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired,
  watch: PropTypes.object.isRequired
};
