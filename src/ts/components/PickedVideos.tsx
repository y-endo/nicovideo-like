// components/PickedVideos.tsx
/**
 * ピックした動画一覧コンポーネント
 * @packageDocumentation
 */

import * as React from 'react';

import FirestoreManager from '~/utils/FirestoreManager';
import fetchYouTubeVideos from '~/utils/fetchYouTubeVideos';

import Loader from '~/components/Loader';
import VideoItem from '~/components/VideoItem';
import { StoreState, youtube } from '~/interfaces';

type Props = {
  pickedVideos: StoreState['pickedVideos'];
  setPickedIsLoaded: (value: boolean) => void;
  pickVideoWithComments: (value: youtube.dataAPI.videos.Resource[]) => void;
};

const PickedVideos: React.FC<Props> = props => {
  const videoItems = props.pickedVideos.videoWithComments.map(data => {
    return (
      <VideoItem
        key={data.id}
        id={data.id}
        title={data.snippet.title}
        thumbnail={data.snippet.thumbnails.high.url}
        channelName={data.snippet.channelTitle}
        publishedAt={data.snippet.publishedAt}
        className={'flex-box-4col-pc__item flex-box-2col-sp__item'}
      />
    );
  });

  /**
   * componentDidMount
   */
  React.useEffect(() => {
    if (props.pickedVideos.isLoaded) return;
    fetch();
  }, []);

  const fetch = async () => {
    const documents = await FirestoreManager.getDocuments('comments', {
      orderBy: {
        key: 'commentCounter',
        order: 'desc'
      },
      limit: 12
    });

    if (!documents) return;

    const videoId = documents.map(document => document.id);

    const result = await fetchYouTubeVideos(videoId).then(json => json);

    if (result.error) return;

    props.setPickedIsLoaded(true);
    props.pickVideoWithComments(result.items);
  };

  return (
    <div className="videos-container">
      {!props.pickedVideos.isLoaded && <Loader />}
      <p className="videos-container__title">コメントの多い動画</p>
      <div className="flex-box-4col-pc flex-box-2col-sp">{videoItems}</div>
    </div>
  );
};

export default PickedVideos;
