import React from 'react';
import PropTypes from 'prop-types';

import CommentList from './CommentList';
import CommentForm from './CommentForm';
import CommentCanvas from './CommentCanvas';
import PlayerControl from './PlayerControl';

import YouTubeIframeAPI from '@/utility/YouTubeIframeAPI';

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false
    };

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
            getDuration={this.getDuration.bind(this)}
            getCurrentTime={this.getCurrentTime.bind(this)}
            ref={this.playerControl}
          />
          <CommentForm getCurrentTime={this.getCurrentTime.bind(this)} postComment={this.props.postComment} />
        </div>
        <div className="comments">
          <CommentList comments={this.props.watch.comments} />
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
          modestbranding: 1,
          disablekb: 1
        },
        events: {
          onReady: this.handlePlayerReady.bind(this)
        }
      });
    });
  }

  handlePlayerReady() {
    this.setState({ isReady: true });

    this.playerControl.current.setDuration();
    this.playerControl.current.setCurrentTime();
  }

  getDuration() {
    if (!this.state.isReady) return -1;
    return this.player.getDuration();
  }

  getCurrentTime() {
    if (!this.state.isReady) return -1;
    return this.player.getCurrentTime();
  }

  playVideo() {
    if (!this.state.isReady) return;
    this.player.playVideo();
    this.commentCanvas.current.playTimeline();
  }

  pauseVideo() {
    if (!this.state.isReady) return;
    this.player.pauseVideo();
    this.commentCanvas.current.pauseTimeline();
  }
}

Player.propTypes = {
  match: PropTypes.object.isRequired,
  postComment: PropTypes.func.isRequired,
  watch: PropTypes.object.isRequired
};
