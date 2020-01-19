// components/CommentList.tsx
/**
 * 動画の横に表示するコメント一覧コンポーネント
 * @packageDocumentation
 */

import * as React from 'react';

import CommentListItem from './CommentListItem';
import convertDuration from '~/utils/convertDuration';
import { Comment } from '~/interfaces';

type Props = {
  comments: Comment[];
  timeFormat: string;
  getCurrentTime: YT.Player['getCurrentTime'];
};

const CommentList: React.FC<Props> = props => {
  const list = React.useRef<HTMLUListElement>(null);
  const lastCurrentTime = React.useRef<number>(0);
  const watchCurrentTimeFrame = React.useRef<number>(0);

  props.comments.sort((a, b) => {
    if (a.currentTime > b.currentTime) return 1;
    if (a.currentTime < b.currentTime) return -1;
    return 0;
  });

  const commentListItems = props.comments.map((data, index) => {
    return <CommentListItem data={data} key={index} timeFormat={props.timeFormat} />;
  });

  /**
   * componentDidMount
   */
  React.useEffect(() => {
    watchCurrentTime();

    /**
     * componentWillUnmount
     */
    return () => {
      cancelAnimationFrame(watchCurrentTimeFrame.current);
    };
  }, []);

  /**
   * 動画の再生時間を監視する
   */
  const watchCurrentTime = () => {
    const currentTime = Math.floor(props.getCurrentTime());

    // 1秒ごとにコメントリストのスクロール位置を更新する
    if (lastCurrentTime.current !== currentTime) {
      lastCurrentTime.current = currentTime;
      setScrollTop();
    }

    watchCurrentTimeFrame.current = requestAnimationFrame(watchCurrentTime);
  };

  /**
   * コメントリストのスクロール位置を設定
   */
  const setScrollTop = () => {
    if (list.current === null) return;
    const formattedCurrentTime = convertDuration.durationToFormat(lastCurrentTime.current, props.timeFormat);
    const comments = list.current.querySelectorAll<HTMLElement>(`[data-current-time="${formattedCurrentTime}"]`);

    if (comments.length > 0) {
      const currentItem = comments[comments.length - 1];
      list.current.scrollTop = currentItem.offsetTop + currentItem.offsetHeight - list.current.offsetHeight;
    }
  };

  return (
    <ul ref={list} className="comment-list">
      {commentListItems}
    </ul>
  );
};

export default CommentList;
