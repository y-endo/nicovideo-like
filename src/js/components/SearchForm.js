import React from 'react';
import PropTypes from 'prop-types';

import { YOUTUBE_API_KEY } from '@/constants/Config';

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

  handleSubmit(e) {
    e.preventDefault();

    const value = this.input.current.value;

    if (value === '') return;
    this.searchVideo(value);
  }

  async searchVideo(value) {
    const parameter = `part=snippet&key=${YOUTUBE_API_KEY}&maxResults=40&type=video&videoEmbeddable=true&q=${value}`;

    const data = await fetch('https://www.googleapis.com/youtube/v3/search?' + parameter, { credentials: 'include' })
      .then(response => response.json())
      .then(json => json)
      .catch(error => {
        new Error(error);
      });

    this.props.searchVideo({
      query: value,
      data
    });
  }
}

SearchForm.propTypes = {
  searchVideo: PropTypes.func.isRequired
};
