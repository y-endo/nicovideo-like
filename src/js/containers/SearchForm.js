import { connect } from 'react-redux';
import { searchVideo } from '@/actions';

import SearchForm from '@/components/SearchForm';

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchVideo: value => dispatch(searchVideo(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
