// containers/Player.ts
/**
 * components/Player.tsxのコンテナ
 * @packageDocumentation
 */

import { connect } from 'react-redux';
import { StoreState, Comment } from '~/interfaces';
import { Dispatch } from 'redux';
import { loadComments, postComment } from '~/actions';

import Player from '~/components/Player';

const mapStateToProps = (state: StoreState) => {
  return {
    player: state.player
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadComments: (value: Comment[]) => dispatch(loadComments(value)),
    postComment: (value: Comment) => dispatch(postComment(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
