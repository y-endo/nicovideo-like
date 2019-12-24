import React from 'react';
import PropTypes from 'prop-types';

import { YOUTUBE_API_KEY } from '@/constants/Config';

export default class Pagination extends React.Component {
  render() {
    const canPrev = this.props.top.searchResultData.prevPageToken !== void 0;
    const canNext = this.props.top.searchResultData.nextPageToken !== void 0 && this.props.top.searchResultData.items.length >= 40;

    return (
      <div className="pagination">
        {canPrev && (
          <a href="" className="pagination__link pagination__link-prev" onClick={this.handleClick.bind(this)}>
            前へ
          </a>
        )}
        {canNext && (
          <a href="" className="pagination__link pagination__link-next" onClick={this.handleClick.bind(this)}>
            次へ
          </a>
        )}
      </div>
    );
  }

  handleClick(e) {
    e.preventDefault();

    if (e.currentTarget.classList.contains('pagination__link-prev')) {
      this.movePage(this.props.top.searchResultData.prevPageToken);
    } else {
      this.movePage(this.props.top.searchResultData.nextPageToken);
    }
  }

  async movePage(pageToken) {
    const parameter = `part=snippet&key=${YOUTUBE_API_KEY}&maxResults=40&type=video&videoEmbeddable=true&q=${this.props.top.searchQuery}&pageToken=${pageToken}`;

    const data = await fetch('https://www.googleapis.com/youtube/v3/search?' + parameter, { credentials: 'include' })
      .then(response => response.json())
      .then(json => json)
      .catch(error => {
        new Error(error);
      });

    this.props.searchVideo({
      query: this.props.top.searchQuery,
      data
    });
  }
}

Pagination.propTypes = {
  top: PropTypes.object.isRequired,
  searchVideo: PropTypes.func.isRequired
};
