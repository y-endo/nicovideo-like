import React from 'react';
import PropTypes from 'prop-types';

import CommentListItem from './CommentListItem';
import convertDuration from '@/utility/convertDuration';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.currentTime = 0;
    this.list = React.createRef();
  }

  render() {
    this.props.comments.sort((a, b) => {
      if (a.currentTime > b.currentTime) return 1;
      if (a.currentTime < b.currentTime) return -1;
      return 0;
    });
    const commentListItems = this.props.comments.map((data, index) => {
      return <CommentListItem data={data} key={index} timeFormat={this.props.timeFormat} />;
    });
    return (
      <ul ref={this.list} className="comment-list">
        {commentListItems}
      </ul>
    );
  }

  componentDidMount() {
    this.watchCurrentTime();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.watchCurrentTimeFrame);
  }

  /**
   * 動画の再生時間を監視する
   */
  watchCurrentTime() {
    const currentTime = Math.floor(this.props.getCurrentTime());

    // 1秒ごとにコメントリストのスクロール位置を更新する
    if (currentTime !== this.currentTime) {
      this.currentTime = currentTime;
      this.setScrollTop();
    }

    this.watchCurrentTimeFrame = requestAnimationFrame(this.watchCurrentTime.bind(this));
  }

  /**
   * コメントリストのスクロール位置を設定
   */
  setScrollTop() {
    const formattedCurrentTime = convertDuration.durationToFormat(this.currentTime, this.props.timeFormat);
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
