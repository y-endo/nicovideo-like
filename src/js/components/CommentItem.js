import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';

export default class CommentItem extends React.Component {
  render() {
    const formattedCurrentTime = moment.duration(this.props.data.currentTime, 'HH:mm:ss').format(this.props.timeFormat, { trim: false });
    return (
      <li className="comment-list__item" data-current-time={formattedCurrentTime}>
        <span className="comment-list__item-time">{formattedCurrentTime}</span>
        <span className="comment-list__item-text">{this.props.data.value}</span>
      </li>
    );
  }
}

CommentItem.propTypes = {
  data: PropTypes.object.isRequired,
  timeFormat: PropTypes.string.isRequired
};
