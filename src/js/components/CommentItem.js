import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';

export default class CommentItem extends React.Component {
  render() {
    const currentTimeSeconds = moment.duration(this.props.data.currentTime, 'HH:mm:ss').format('ss');

    let format = '';
    if (currentTimeSeconds >= 36000) {
      format = 'HH:mm:ss';
    } else if (currentTimeSeconds >= 3600) {
      format = 'H:mm:ss';
    } else {
      format = 'mm:ss';
    }

    return (
      <li className="comment-list__item">
        {moment.duration(parseInt(currentTimeSeconds, 10), 'seconds').format(format, { trim: false }) + ' | ' + this.props.data.value}
      </li>
    );
  }
}

CommentItem.propTypes = {
  data: PropTypes.object.isRequired
};
