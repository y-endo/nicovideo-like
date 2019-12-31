import { connect } from 'react-redux';
import { loadComments, postComment } from '@/actions';

import Player from '@/components/Player';

const mapStateToProps = state => {
  return {
    player: state.player
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadComments: value => dispatch(loadComments(value)),
    postComment: value => dispatch(postComment(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
