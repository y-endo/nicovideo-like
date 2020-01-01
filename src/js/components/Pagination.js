import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Pagination extends React.Component {
  render() {
    const canPrev = this.props.search.result.prevPageToken !== void 0;
    const canNext = this.props.search.result.nextPageToken !== void 0 && this.props.search.result.items.length >= 40;

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
   * @param {Event} event イベントオブジェクト
   */
  handleClick(event) {
    event.preventDefault();

    if (event.currentTarget.classList.contains('pagination__link-prev')) {
      this.movePage(this.props.search.result.prevPageToken);
    } else {
      this.movePage(this.props.search.result.nextPageToken);
    }
  }

  /**
   * 前or次ページへ移動
   * @param {String} pageToken YouTubeAPIのpageToken
   */
  movePage(pageToken) {
    window.scrollTo(0, 0);
    this.props.history.push(`/search/${this.props.search.query}/${pageToken}`);
  }
}

Pagination.propTypes = {
  history: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  searchVideo: PropTypes.func.isRequired
};

export default withRouter(Pagination);
