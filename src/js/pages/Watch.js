import React from 'react';
import PropTypes from 'prop-types';

import Layout from '@/components/Layout';
import SearchForm from '@/containers/SearchForm';
import Player from '@/containers/Player';

export default class Watch extends React.Component {
  render() {
    const content = (
      <section className="content">
        <SearchForm />
        <Player {...this.props} />
      </section>
    );

    return <Layout content={content} />;
  }
}

Watch.propTypes = {
  match: PropTypes.object.isRequired
};
