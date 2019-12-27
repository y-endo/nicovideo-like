import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default class VideoItem extends React.Component {
  render() {
    return (
      <div className="video-item">
        <Link to={`/watch/${this.props.id}`} className="video-item__link">
          <div className="video-item__thumb">
            <img src={this.props.thumbnail} alt="" className="video-item__thumb-image" />
          </div>
          <div className="video-item__meta">
            <p className="video-item__title">{this.props.title}</p>
            <p className="video-item__channel-name">{this.props.channelName}</p>
            <p className="video-item__date">{format(new Date(this.props.publishedAt), 'yyyy/MM/dd')}</p>
          </div>
        </Link>
      </div>
    );
  }
}

VideoItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired
};
