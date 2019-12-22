import { connect } from 'react-redux';
import { searchVideo } from '@/actions';

import Top from '@/pages/Top';

const mapStateToProps = state => {
  return {
    top: state.top
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchVideo: value => dispatch(searchVideo(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Top);
