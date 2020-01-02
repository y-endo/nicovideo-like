import React from 'react';

import Layout from '@/components/Layout';
import SearchForm from '@/containers/SearchForm';
import PickedVideos from '@/containers/PickedVideos';

export default class Home extends React.Component {
  render() {
    const content = (
      <section className="content">
        <SearchForm />
        <PickedVideos />
      </section>
    );

    return <Layout content={content} />;
  }
}
