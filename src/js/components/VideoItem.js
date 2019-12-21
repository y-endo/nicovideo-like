import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class VideoItem extends React.Component {
  render() {
    return (
      <div className="video-item">
        <div className="video-item__thumb">
          <img src={this.props.thumbnail} alt="" className="video-item__thumb-image" />
        </div>
        <div className="video-item__meta">
          <p className="video-item__title">{this.props.title}</p>
          <p className="video-item__channel-name">{this.props.channelName}</p>
          <p className="video-item__date">{moment(this.props.publishedAt).format('YYYY/MM/DD')}</p>
        </div>
      </div>
    );
  }
}

VideoItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired
};