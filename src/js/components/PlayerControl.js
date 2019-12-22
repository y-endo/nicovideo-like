import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';

export default class PlayerControl extends React.Component {
  constructor(props) {
    super(props);
    this.format = '';
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
        <button className="player-control__rewind-button">&lt; 10</button>
        <button className="player-control__skip-button">10 &gt;</button>
      </div>
    );
  }

  handlePlayClick() {
    this.props.playVideo();
  }

  handlePauseClick() {
    this.props.pauseVideo();
  }

  setCurrentTime() {
    const current = this.props.getCurrentTime();

    this.setState({
      currentTime: moment.duration(current, 'seconds').format(this.format, { trim: false })
    });

    requestAnimationFrame(this.setCurrentTime.bind(this));
  }

  setDuration() {
    const all = this.props.getDuration();

    if (all >= 36000) {
      this.format = 'HH:mm:ss';
    } else if (all >= 3600) {
      this.format = 'H:mm:ss';
    } else {
      this.format = 'mm:ss';
    }

    this.setState({
      duration: moment.duration(all, 'seconds').format(this.format, { trim: false })
    });
  }
}

PlayerControl.propTypes = {
  playVideo: PropTypes.func.isRequired,
  pauseVideo: PropTypes.func.isRequired,
  getDuration: PropTypes.func.isRequired,
  getCurrentTime: PropTypes.func.isRequired
};
