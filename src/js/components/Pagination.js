import React from 'react';
import PropTypes from 'prop-types';

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

  /**
   * クリックイベント
   * @param {Event} e イベントオブジェクト
   */
  handleClick(e) {
    e.preventDefault();

    if (e.currentTarget.classList.contains('pagination__link-prev')) {
      this.movePage(this.props.top.searchResultData.prevPageToken);
    } else {
      this.movePage(this.props.top.searchResultData.nextPageToken);
    }
  }

  /**
   * 前or次ページへ移動
   * @param {String} pageToken YouTubeAPIのpageToken
   */
  movePage(pageToken) {
    window.location.search = `query=${this.props.top.searchQuery}&pageToken=${pageToken}`;
  }
}

Pagination.propTypes = {
  top: PropTypes.object.isRequired,
  searchVideo: PropTypes.func.isRequired
};
