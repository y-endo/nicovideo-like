// containers/SearchForm.ts
/**
 * components/SearchForm.tsxのコンテナ
 * @packageDocumentation
 */

import { connect } from 'react-redux';
import { StoreState, youtube } from '~/interfaces';
import { Dispatch } from 'redux';
import { setSearchIsLoading, searchVideo } from '~/actions';

import SearchForm from '~/components/SearchForm';

const mapStateToProps = (state: StoreState) => {
  return {
    search: state.search
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSearchIsLoading: (value: boolean) => dispatch(setSearchIsLoading(value)),
    searchVideo: (value: { query: string; result: youtube.dataAPI.search.List }) => dispatch(searchVideo(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
