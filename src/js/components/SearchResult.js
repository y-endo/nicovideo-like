import React from 'react';
import PropTypes from 'prop-types';

import VideoItem from './VideoItem';
import Pagination from './Pagination';

export default class SearchResult extends React.Component {
  render() {
    let videoItems;

    videoItems = this.props.top.searchResultData.items.map(data => {
      return (
        <VideoItem
          key={data.id.videoId}
          title={data.snippet.title}
          thumbnail={data.snippet.thumbnails.high.url}
          channelName={data.snippet.channelTitle}
          publishedAt={data.snippet.publishedAt}
        />
      );
    });

    return (
      <section className="search-result">
        <div className="videos-container">{videoItems}</div>
        <Pagination {...this.props} />
      </section>
    );
  }
}

SearchResult.propTypes = {
  top: PropTypes.object.isRequired
};
