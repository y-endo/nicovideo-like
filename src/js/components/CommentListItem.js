import React from 'react';
import PropTypes from 'prop-types';

import convertDuration from '@/utility/convertDuration';

export default class CommentListItem extends React.Component {
  render() {
    const duration = convertDuration.HHmmssToDuration(this.props.data.currentTime);
    const formattedCurrentTime = convertDuration.durationToFormat(duration, this.props.timeFormat);

    return (
      <li className="comment-list__item" data-current-time={formattedCurrentTime}>
        <span className="comment-list__item-time">{formattedCurrentTime}</span>
        <span className="comment-list__item-text">
          <span className="commnet-list__item-text-value">{this.props.data.value}</span>
        </span>
      </li>
    );
  }
}

CommentListItem.propTypes = {
  data: PropTypes.object.isRequired,
  timeFormat: PropTypes.string.isRequired
};
