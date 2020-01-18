// pages/Home.tsx
/**
 * Homeページコンポーネント
 * @packageDocumentation
 */

import * as React from 'react';

import Layout from '~/components/Layout';
import SearchForm from '~/containers/SearchForm';
import PickedVideos from '~/containers/PickedVideos';

const Home: React.FC = () => {
  const content = (
    <section className="content">
      <SearchForm />
      <PickedVideos />
    </section>
  );

  return <Layout content={content} />;
};

export default Home;
