// containers/Pagination.ts
/**
 * components/Pagination.tsxのコンテナ
 * @packageDocumentation
 */

import { connect } from 'react-redux';
import { StoreState, youtube } from '~/interfaces';
import { Dispatch } from 'redux';
import { searchVideo } from '~/actions';

import Pagination from '~/components/Pagination';

const mapStateToProps = (state: StoreState) => {
  return {
    search: state.search
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    searchVideo: (value: { query: string; result: youtube.dataAPI.search.List }) => dispatch(searchVideo(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
