import React from 'react';
import PropTypes from 'prop-types';

import Layout from '@/components/Layout';
import SearchForm from '@/containers/SearchForm';
import Player from '@/containers/Player';

export default class Watch extends React.Component {
  render() {
    return (
      <Layout
        page={
          <section className="content">
            <SearchForm />
            <Player {...this.props} />
          </section>
        }
      />
    );
  }
}

Watch.propTypes = {
  match: PropTypes.object.isRequired
};
