// components/CommentForm.tsx
/**
 * 動画のコメント入力フォームコンポーネント
 * @packageDocumentation
 */

import * as React from 'react';
import uuidv4 from 'uuid/v4';

import { firebase } from '~/api/firebase';
import FirestoreManager from '~/utils/FirestoreManager';
import convertDuration from '~/utils/convertDuration';
import { Comment } from '~/interfaces';

type Props = {
  getCurrentTime: YT.Player['getCurrentTime'];
  postComment: (value: Comment) => void;
  videoId: string;
};

const CommentForm: React.FC<Props> = props => {
  const input = React.useRef<HTMLInputElement>(null);

  /**
   * サブミットイベント
   * @param event イベントオブジェクト
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (input.current === null) return;

    const value = input.current.value;
    let currentTime = props.getCurrentTime();

    if (value !== '' && currentTime >= 0) {
      // firestoreに登録するコメントのデータ
      const commentData = {
        id: uuidv4(),
        value,
        currentTime: convertDuration.durationToFormat(currentTime, 'HH:mm:ss')
      };

      props.postComment(commentData);
      FirestoreManager.addData('comments', props.videoId, {
        commentCounter: firebase.firestore.FieldValue.increment(1),
        comments: firebase.firestore.FieldValue.arrayUnion(commentData)
      });

      input.current.value = '';
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input type="text" className="comment-form__input" ref={input} />
      <button className="comment-form__button">コメントする</button>
    </form>
  );
};

export default CommentForm;
