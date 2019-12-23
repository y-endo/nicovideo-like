import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';

export default class PlayerControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0
    };
  }

  render() {
    return (
      <div className="player-control">
        <button className="player-control__play-button" onClick={this.handlePlayClick.bind(this)}>
          play
        </button>
        <button className="player-control__play-button" onClick={this.handlePauseClick.bind(this)}>
          pause
        </button>
        <div className="player-control__duration">
          <span className="player-control__duration-current">{this.state.currentTime}</span>/
          <span className="player-control__duration-all">{this.state.duration}</span>
        </div>
        <button className="player-control__rewind-button" onClick={this.handleRewindClick.bind(this)}>
          &lt; 10
        </button>
        <button className="player-control__skip-button" onClick={this.handleSkipClick.bind(this)}>
          10 &gt;
        </button>
      </div>
    );
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animFrame);
  }

  handlePlayClick() {
    this.props.playVideo();
  }

  handlePauseClick() {
    this.props.pauseVideo();
  }

  handleRewindClick() {
    const currentTime = this.props.getCurrentTime();
    this.props.seekTo(currentTime - 10);
  }

  handleSkipClick() {
    const currentTime = this.props.getCurrentTime();
    this.props.seekTo(currentTime + 10);
  }

  setCurrentTime() {
    const currentTime = this.props.getCurrentTime();

    this.setState({
      currentTime: moment.duration(currentTime, 'seconds').format(this.props.timeFormat, { trim: false })
    });

    this.animFrame = requestAnimationFrame(this.setCurrentTime.bind(this));
  }

  setDuration() {
    this.setState({
      currentTime: moment.duration(0, 'seconds').format(this.props.timeFormat, { trim: false }),
      duration: moment.duration(this.props.getDuration(), 'seconds').format(this.props.timeFormat, { trim: false })
    });
  }
}

PlayerControl.propTypes = {
  playVideo: PropTypes.func.isRequired,
  pauseVideo: PropTypes.func.isRequired,
  seekTo: PropTypes.func.isRequired,
  getDuration: PropTypes.func.isRequired,
  getCurrentTime: PropTypes.func.isRequired,
  timeFormat: PropTypes.string.isRequired
};
