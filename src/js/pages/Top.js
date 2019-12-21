import React from 'react';

import SearchForm from '@/components/SearchForm';
import SearchResult from '@/components/SearchResult';

export default class Top extends React.Component {
  render() {
    return (
      <section className="content">
        <SearchForm {...this.props} />
        <SearchResult {...this.props} />
      </section>
    );
  }
}
