// components/VideoItem.tsx
/**
 * 一覧表示用の動画コンポーネント
 * @packageDocumentation
 */

import * as React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

type Props = {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  publishedAt: string;
  className?: string;
};

const VideoItem: React.FC<Props> = props => {
  let className = 'video-item';

  if (props.className && props.className !== '') {
    className += ' ' + props.className;
  }

  return (
    <div className={className}>
      <Link to={`/watch/${props.id}`} className="video-item__link">
        <div className="video-item__thumb">
          <img src={props.thumbnail} alt="" className="video-item__thumb-image" />
        </div>
        <div className="video-item__meta">
          <p className="video-item__title">{props.title}</p>
          <p className="video-item__channel-name">{props.channelName}</p>
          <p className="video-item__date">{format(new Date(props.publishedAt), 'yyyy/MM/dd')}</p>
        </div>
      </Link>
    </div>
  );
};

export default VideoItem;
