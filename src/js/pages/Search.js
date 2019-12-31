import React from 'react';
import PropTypes from 'prop-types';

import Layout from '@/components/Layout';
import SearchForm from '@/containers/SearchForm';
import SearchResult from '@/containers/SearchResult';

export default class Search extends React.Component {
  render() {
    return (
      <Layout
        page={
          <section className="content">
            <SearchForm />
            <SearchResult />
          </section>
        }
      />
    );
  }
}

Search.propTypes = {
  match: PropTypes.object.isRequired
};
