// pages/Search.tsx
/**
 * Searchページコンポーネント
 * @packageDocumentation
 */

import React from 'react';
import Layout from '~/components/Layout';
import SearchForm from '~/containers/SearchForm';
import SearchResult from '~/containers/SearchResult';

const Search: React.FC = () => {
  const content = (
    <section className="content">
      <SearchForm />
      <SearchResult />
    </section>
  );

  return <Layout content={content} />;
};

export default Search;
