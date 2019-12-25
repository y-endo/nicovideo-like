import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import searchVideo from '@/utility/searchVideo';

export default class SearchForm extends React.Component {
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
    const locationQuery = queryString.parse(this.props.location.search);

    if (locationQuery.query && locationQuery.query !== '') {
      this.input.current.value = locationQuery.query;
      this.searchVideo(locationQuery.query, locationQuery.pageToken || '');
    }
  }

  /**
   * 検索のサブミットイベント
   * @param {Event} e イベントオブジェクト
   */
  handleSubmit(e) {
    e.preventDefault();

    const value = this.input.current.value;

    if (value === '') return;
    window.location.search = `query=${value}`;
  }

  /**
   * 動画の検索
   * @param {String} value 検索する文言
   * @param {String} pageToken YouTubeAPIのpageToken
   */
  async searchVideo(value, pageToken = '') {
    const data = await searchVideo(value, pageToken).then(json => json);

    if (data.error) return;

    this.props.searchVideo({
      query: value,
      data
    });
  }
}

SearchForm.propTypes = {
  searchVideo: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};
