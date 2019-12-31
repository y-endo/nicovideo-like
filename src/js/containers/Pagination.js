import { connect } from 'react-redux';
import { searchVideo } from '@/actions';

import Pagination from '@/components/Pagination';

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

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
