import React from 'react';
import PropTypes from 'prop-types';

import CommentItem from './CommentItem';

export default class CommentList extends React.Component {
  render() {
    const commentItems = this.props.comments.map((data, index) => {
      return <CommentItem data={data} key={index} />;
    });
    return <ul className="comment-list">{commentItems}</ul>;
  }
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
};
