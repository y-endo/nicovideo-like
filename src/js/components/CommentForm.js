import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import { firebase } from '@/api/firebase';
import FirestoreManager from '@/utility/FirestoreManager';
import convertDuration from '@/utility/convertDuration';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" className="comment-form__input" ref={this.input} />
        <button className="comment-form__button">コメントする</button>
      </form>
    );
  }

  /**
   * サブミットイベント
   * @param {Event} e イベントオブジェクト
   */
  handleSubmit(e) {
    e.preventDefault();

    const value = this.input.current.value;
    let currentTime = this.props.getCurrentTime();

    if (value !== '' && typeof currentTime === 'number' && currentTime >= 0) {
      // firestoreに登録するコメントのデータ
      const commentData = {
        id: uuidv4(),
        value,
        currentTime: convertDuration.durationToFormat(currentTime, 'HH:mm:ss')
      };

      this.props.postComment(commentData);
      FirestoreManager.addData(this.props.videoId, {
        comments: firebase.firestore.FieldValue.arrayUnion(commentData)
      });
      this.input.current.value = null;
    }
  }
}

CommentForm.propTypes = {
  getCurrentTime: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  videoId: PropTypes.string.isRequired
};
