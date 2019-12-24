import { connect } from 'react-redux';
import { loadComments, postComment } from '@/actions';

import Watch from '@/pages/Watch';

const mapStateToProps = state => {
  return {
    watch: state.watch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadComments: value => dispatch(loadComments(value)),
    postComment: value => dispatch(postComment(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Watch);
