// components/SearchResult.tsx
/**
 * 動画の検索結果を表示するコンポーネント
 * @packageDocumentation
 */

import * as React from 'react';

import VideoItem from './VideoItem';
import Loader from '~/components/Loader';
import Pagination from '~/containers/Pagination';
import { StoreState } from '~/interfaces';

type Props = {
  search: StoreState['search'];
};

const SearchResult: React.FC<Props> = props => {
  const videoItems = props.search.result.items.map(data => {
    return (
      <VideoItem
        key={data.id.videoId}
        id={data.id.videoId}
        title={data.snippet.title}
        thumbnail={data.snippet.thumbnails.high.url}
        channelName={data.snippet.channelTitle}
        publishedAt={data.snippet.publishedAt}
        className={'flex-box-4col-pc__item flex-box-2col-sp__item'}
      />
    );
  });

  return (
    <section className="search-result">
      <div className="videos-container">
        {props.search.isLoading && <Loader />}
        <div className="flex-box-4col-pc flex-box-2col-sp">{videoItems}</div>
      </div>
      <Pagination />
    </section>
  );
};

export default SearchResult;
