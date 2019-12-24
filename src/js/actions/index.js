import * as types from '@/constants/ActionTypes';

export function searchVideo(value) {
  return {
    type: types.SEARCH_VIDEO,
    payload: {
      query: value.query,
      data: value.data
    }
  };
}

export function loadComments(value) {
  return {
    type: types.LOAD_COMMENTS,
    payload: {
      comments: value
    }
  };
}

export function postComment(value) {
  return {
    type: types.POST_COMMENT,
    payload: {
      comment: value
    }
  };
}
