import * as types from '@/constants/ActionTypes';

export function setIsSearchLoading(value) {
  return {
    type: types.SET_IS_SEARCH_LOADING,
    payload: value
  };
}

export function searchVideo(value) {
  return {
    type: types.SEARCH_VIDEO,
    payload: {
      query: value.query,
      result: value.result
    }
  };
}

export function loadComments(value) {
  return {
    type: types.LOAD_COMMENTS,
    payload: value
  };
}

export function postComment(value) {
  return {
    type: types.POST_COMMENT,
    payload: value
  };
}
