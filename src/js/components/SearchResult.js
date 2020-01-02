import React from 'react';
import PropTypes from 'prop-types';

import VideoItem from './VideoItem';
import Loader from '@/components/Loader';
import Pagination from '@/containers/Pagination';

export default class SearchResult extends React.Component {
  render() {
    let videoItems;

    videoItems = this.props.search.result.items.map(data => {
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
          {this.props.search.isLoading && <Loader />}
          <div className="flex-box-4col-pc flex-box-2col-sp">{videoItems}</div>
        </div>
        <Pagination />
      </section>
    );
  }
}

SearchResult.propTypes = {
  search: PropTypes.object.isRequired
};
