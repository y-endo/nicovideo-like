// pages/Watch.tsx
/**
 * Watchページコンポーネント
 * @packageDocumentation
 */

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Layout from '~/components/Layout';
import SearchForm from '~/containers/SearchForm';
import Player from '~/containers/Player';

const Watch: React.FC<RouteComponentProps<{ id: string }>> = props => {
  const content = (
    <section className="content">
      <SearchForm />
      <Player {...props} />
    </section>
  );

  return <Layout content={content} />;
};

export default Watch;
