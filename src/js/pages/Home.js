import React from 'react';

import Layout from '@/components/Layout';
import SearchForm from '@/containers/SearchForm';

export default class Home extends React.Component {
  render() {
    return (
      <Layout
        page={
          <section className="content">
            <SearchForm />
          </section>
        }
      />
    );
  }
}
