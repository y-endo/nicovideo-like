// containers/SearchResult.ts
/**
 * components/SearchResult.tsxのコンテナ
 * @packageDocumentation
 */

import { connect } from 'react-redux';
import { StoreState } from '~/interfaces';
import SearchResult from '~/components/SearchResult';

const mapStateToProps = (state: StoreState) => {
  return {
    search: state.search
  };
};

export default connect(mapStateToProps, {})(SearchResult);
