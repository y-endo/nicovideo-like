import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import fetchYouTubeSearch from '@/utility/fetchYouTubeSearch';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="search-form">
        <input type="text" className="search-form__input" ref={this.input} />
        <button className="search-form__button">検索</button>
      </form>
    );
  }

  componentDidMount() {
    const searchQuery = this.props.match.params.query;
    const pageToken = this.props.match.params.pageToken || '';

    // URLに検索クエリが含まれている場合は検索を実行する。
    if (searchQuery && searchQuery !== '') {
      this.input.current.value = searchQuery;
      this.search(searchQuery, pageToken);
    }
  }

  componentDidUpdate(prevProps) {
    // URLのqueryかpageTokenが変わったらデータ更新
    if (prevProps.match.params.query !== this.props.match.params.query || prevProps.match.params.pageToken !== this.props.match.params.pageToken) {
      const searchQuery = this.props.match.params.query;
      const pageToken = this.props.match.params.pageToken || '';

      // URLに検索クエリが含まれている場合は検索を実行する。
      if (searchQuery && searchQuery !== '') {
        this.input.current.value = searchQuery;
        this.search(searchQuery, pageToken);
      }
    }
  }

  /**
   * 検索のサブミットイベント
   * @param {Event} event イベントオブジェクト
   */
  handleSubmit(event) {
    event.preventDefault();

    const value = this.input.current.value;

    if (value === '') return;
    this.props.history.push(`/search/${value}`);
  }

  /**
   * 動画の検索
   * @param {String} value 検索する文言
   * @param {String} pageToken YouTubeAPIのpageToken
   */
  async search(value, pageToken = '') {
    this.props.setIsSearchLoading(true);
    const result = await fetchYouTubeSearch(value, pageToken).then(json => json);
    this.props.setIsSearchLoading(false);

    if (result.error) return;

    this.props.searchVideo({
      query: value,
      result
    });
  }
}

SearchForm.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  setIsSearchLoading: PropTypes.func.isRequired,
  searchVideo: PropTypes.func.isRequired
};

export default withRouter(SearchForm);
