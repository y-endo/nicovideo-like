// components/CommentListItem.tsx
/**
 * 動画の横のコメント一覧に表示するコメントコンポーネント
 * @packageDocumentation
 */

import * as React from 'react';

import convertDuration from '~/utils/convertDuration';
import { Comment } from '~/interfaces';

type Props = {
  data: Comment;
  timeFormat: string;
};

const CommentListItem: React.FC<Props> = props => {
  const duration = convertDuration.HHmmssToDuration(props.data.currentTime);
  const formattedCurrentTime = convertDuration.durationToFormat(duration, props.timeFormat);

  return (
    <li className="comment-list__item" data-current-time={formattedCurrentTime}>
      <span className="comment-list__item-time">{formattedCurrentTime}</span>
      <span className="comment-list__item-text">
        <span className="commnet-list__item-text-value">{props.data.value}</span>
      </span>
    </li>
  );
};

export default CommentListItem;
