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
      timeFormat: 'mm:ss',
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
            <CommentCanvas ref={this.commentCanvas} getCurrentTime={this.getCurrentTime.bind(this)} comments={this.props.player.comments} />
            <div id="player"></div>
          </div>
          <PlayerControl
            playVideo={this.playVideo.bind(this)}
            pauseVideo={this.pauseVideo.bind(this)}
            seekTo={this.seekTo.bind(this)}
            getDuration={this.getDuration.bind(this)}
            getCurrentTime={this.getCurrentTime.bind(this)}
            getVolume={this.getVolume.bind(this)}
            mute={this.mute.bind(this)}
            unMute={this.unMute.bind(this)}
            setVolume={this.setVolume.bind(this)}
            ref={this.playerControl}
            timeFormat={this.state.timeFormat}
          />
          <CommentForm getCurrentTime={this.getCurrentTime.bind(this)} postComment={this.props.postComment} videoId={this.props.match.params.id} />
        </div>
        <div className="comments">
          <CommentList comments={this.props.player.comments} getCurrentTime={this.getCurrentTime.bind(this)} timeFormat={this.state.timeFormat} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    // YouTubeのiframe作成
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
          onReady: this.handlePlayerReady.bind(this),
          onStateChange: this.handlePlayerStateChange.bind(this)
        }
      });
    });

    // 動画のコメントデータを取得する
    FirestoreManager.getData(this.props.match.params.id).then(data => {
      if (data && data.comments) this.props.loadComments(data.comments);
    });
  }

  componentWillUnmount() {
    this.props.loadComments([]);
  }

  /**
   * YouTubeのreadyイベント
   */
  handlePlayerReady() {
    this.setState({ isReady: true });

    const duration = this.getDuration();
    if (duration >= 36000) {
      this.setState({ timeFormat: 'HH:mm:ss' });
    } else if (duration >= 3600) {
      this.setState({ timeFormat: 'H:mm:ss' });
    } else {
      this.setState({ timeFormat: 'mm:ss' });
    }

    this.playerControl.current.initialize();
  }

  /**
   * YouTubeAPIのstateChangeイベント
   * @param {Object} event イベントオブジェクト
   */
  handlePlayerStateChange(event) {
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

    this.playerControl.current.handlePlayerStateChange(event);
  }

  /**
   * 動画の長さ(秒)を取得
   */
  getDuration() {
    if (!this.state.isReady) return -1;
    return this.player.getDuration();
  }

  /**
   * 動画の現在の再生時間を取得
   */
  getCurrentTime() {
    if (!this.state.isReady) return -1;
    if (this.player.getPlayerState() === 0) return this.getDuration();
    return this.player.getCurrentTime();
  }

  /**
   * 動画の音量を取得
   */
  getVolume() {
    if (!this.state.isReady) return;
    return {
      value: this.player.getVolume(),
      isMuted: this.player.isMuted()
    };
  }

  /**
   * 動画の音量を設定
   * @param {Number} volume 音量
   */
  setVolume(volume) {
    if (!this.state.isReady) return;
    this.player.setVolume(volume);
  }

  /**
   * 動画を再生
   */
  playVideo() {
    if (!this.state.isReady) return;
    this.player.playVideo();
  }

  /**
   * 動画を一時停止
   */
  pauseVideo() {
    if (!this.state.isReady) return;
    this.player.pauseVideo();
  }

  /**
   * 動画をスキップ
   * @param {Number} seconds 再生位置(秒)
   */
  seekTo(seconds) {
    if (!this.state.isReady) return;
    this.player.seekTo(seconds);
    this.commentCanvas.current.seekTimeline(seconds);
  }

  /**
   * 動画をミュートにする
   */
  mute() {
    if (!this.state.isReady) return;
    this.player.mute();
  }

  /**
   * 動画のミュートを解除
   */
  unMute() {
    if (!this.state.isReady) return;
    this.player.unMute();
  }
}

Player.propTypes = {
  match: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  postComment: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired
};
