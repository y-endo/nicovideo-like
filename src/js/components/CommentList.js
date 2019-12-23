import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';

import CommentItem from './CommentItem';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.currentTime = 0;
    this.list = React.createRef();
  }

  render() {
    const commentItems = this.props.comments.map((data, index) => {
      return <CommentItem data={data} key={index} timeFormat={this.props.timeFormat} />;
    });
    return (
      <ul ref={this.list} className="comment-list">
        {commentItems}
      </ul>
    );
  }

  componentDidMount() {
    this.watchCurrentTime();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animFrame);
  }

  watchCurrentTime() {
    const currentTime = Math.floor(this.props.getCurrentTime());

    if (currentTime !== this.currentTime) {
      this.currentTime = currentTime;
      this.setScrollTop();
    }

    this.animFrame = requestAnimationFrame(this.watchCurrentTime.bind(this));
  }

  setScrollTop() {
    const formattedCurrentTime = moment.duration(this.currentTime, 'seconds').format(this.props.timeFormat, { trim: false });

    const comments = this.list.current.querySelectorAll(`[data-current-time="${formattedCurrentTime}"]`);
    if (comments.length > 0) {
      const currentItem = comments[comments.length - 1];
      this.list.current.scrollTop = currentItem.offsetTop + currentItem.offsetHeight - this.list.current.offsetHeight;
    }
  }
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  timeFormat: PropTypes.string.isRequired,
  getCurrentTime: PropTypes.func.isRequired
};
