import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';

import debounce from '@/utility/debounce';

export default class PlayerControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 0,
      isMuted: false,
      seekDraggingValue: 0,
      isSeekDragging: false
    };
  }

  render() {
    return (
      <div className="player-control">
        <div className="player-seek">
          <input
            type="range"
            min="0"
            max={this.props.getDuration()}
            step="1"
            className="player-seek__bar"
            value={this.state.isSeekDragging ? this.state.seekDraggingValue : this.props.getCurrentTime()}
            onChange={this.handleSeekChange.bind(this)}
          />
          <div className="player-duration">
            <span className="player-duration__current">{this.state.currentTime}</span>/
            <span className="player-duration__all">{this.state.duration}</span>
          </div>
        </div>
        <div className="player-buttons">
          {this.state.isPlaying ? (
            <button className="player-buttons__play" onClick={this.handlePauseClick.bind(this)}>
              <div className="button-inner">
                <svg viewBox="0 0 512 512" className="icon-pause">
                  <use xlinkHref="#icon-pause"></use>
                </svg>
              </div>
            </button>
          ) : (
            <button className="player-buttons__play" onClick={this.handlePlayClick.bind(this)}>
              <div className="button-inner">
                <svg viewBox="0 0 512 512" className="icon-play">
                  <use xlinkHref="#icon-play"></use>
                </svg>
              </div>
            </button>
          )}
          <button className="player-buttons__rewind" onClick={this.handleRewindClick.bind(this)}>
            <div className="button-inner">
              <svg viewBox="0 0 48 48" className="icon-rewind">
                <use xlinkHref="#icon-skip"></use>
              </svg>{' '}
              10
            </div>
          </button>
          <button className="player-buttons__skip" onClick={this.handleSkipClick.bind(this)}>
            <div className="button-inner">
              10{' '}
              <svg viewBox="0 0 48 48" className="icon-skip">
                <use xlinkHref="#icon-skip"></use>
              </svg>
            </div>
          </button>
          <div className="player-volume">
            <button className="player-volume__mute" onClick={this.handleMuteClick.bind(this)}>
              <div className="button-inner">
                <svg viewBox="0 0 18 18" className="icon-volume">
                  {this.state.isMuted ? <use xlinkHref="#icon-mute"></use> : <use xlinkHref="#icon-unmute"></use>}
                </svg>
              </div>
            </button>
            <input
              type="range"
              className="player-volume__range"
              min="0"
              max="100"
              step="1"
              value={this.state.volume}
              onChange={this.handleVolumeChange.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setStateCurrentTime();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.setStateCurrentTimeFrame);
  }

  /**
   * 初期設定
   */
  initialize() {
    this.setStateDurationOnce();
    this.setStateVolume();
  }

  /**
   * 再生ボタンのクリックイベント
   */
  handlePlayClick() {
    this.props.playVideo();
  }

  /**
   * 一時停止ボタンのクリックイベント
   */
  handlePauseClick() {
    this.props.pauseVideo();
  }

  /**
   * 10秒巻き戻すのクリックイベント
   */
  handleRewindClick() {
    const currentTime = this.props.getCurrentTime();
    this.props.seekTo(currentTime - 10);
  }

  /**
   * 10秒進むのクリックイベント
   */
  handleSkipClick() {
    const currentTime = this.props.getCurrentTime();
    this.props.seekTo(currentTime + 10);
  }

  /**
   * ミュートボタンのクリックイベント
   */
  handleMuteClick() {
    if (this.state.isMuted) {
      this.props.unMute();
      this.setState({ isMuted: false });
    } else {
      this.props.mute();
      this.setState({ isMuted: true });
    }
  }

  /**
   * 動画のシークバー変更イベント
   * @param {Event} event イベントオブジェクト
   */
  handleSeekChange(event) {
    const value = parseInt(event.currentTarget.value, 10);

    this.setState({ isSeekDragging: true, seekDraggingValue: value });

    debounce(() => {
      this.props.seekTo(value);
    }, 1000)();
  }

  /**
   * 音量のバー変更イベント
   * @param {Event} event イベントオブジェクト
   */
  handleVolumeChange(event) {
    const value = parseInt(event.currentTarget.value, 10);

    this.props.setVolume(value);
    this.setState({ volume: value });
  }

  /**
   * YouTubeAPIのstateChangeイベント
   * @param {Object} event イベントオブジェクト
   */
  handlePlayerStateChange(event) {
    if (event.data === 1) {
      this.setState({ isPlaying: true });
    } else if (event.data === 0 || event.data === 2) {
      this.setState({ isPlaying: false });
    }

    if (event.data === 1 && this.state.isSeekDragging) {
      this.setState({ isSeekDragging: false });
    }
  }

  /**
   * ローカルステートのcurrentTimeを設定
   */
  setStateCurrentTime() {
    const currentTime = this.state.isSeekDragging ? this.state.seekDraggingValue : this.props.getCurrentTime();

    this.setState({
      currentTime: moment.duration(currentTime, 'seconds').format(this.props.timeFormat, { trim: false })
    });

    this.setStateCurrentTimeFrame = requestAnimationFrame(this.setStateCurrentTime.bind(this));
  }

  /**
   * ローカルステートのdurationとcurrentTimeを設定
   * 初期化のタイミングで一度だけ実行
   */
  setStateDurationOnce() {
    this.setState({
      currentTime: moment.duration(0, 'seconds').format(this.props.timeFormat, { trim: false }),
      duration: moment.duration(this.props.getDuration(), 'seconds').format(this.props.timeFormat, { trim: false })
    });
  }

  /**
   * ローカルステートのvolumeを変更
   */
  setStateVolume() {
    const volume = this.props.getVolume();

    this.setState({
      volume: volume.value,
      isMuted: volume.isMuted
    });
  }
}

PlayerControl.propTypes = {
  playVideo: PropTypes.func.isRequired,
  pauseVideo: PropTypes.func.isRequired,
  seekTo: PropTypes.func.isRequired,
  getDuration: PropTypes.func.isRequired,
  getCurrentTime: PropTypes.func.isRequired,
  getVolume: PropTypes.func.isRequired,
  mute: PropTypes.func.isRequired,
  unMute: PropTypes.func.isRequired,
  setVolume: PropTypes.func.isRequired,
  timeFormat: PropTypes.string.isRequired
};
