import * as types from '@/constants/ActionTypes';

//-----------------------------------
// search
//-----------------------------------
export function setSearchIsLoading(value) {
  return {
    type: types.SET_SEARCH_IS_LOADING,
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

//-----------------------------------
// pickedVideos
//-----------------------------------
export function setPickedIsLoaded(value) {
  return {
    type: types.SET_PICKED_IS_LOADED,
    payload: value
  };
}
export function loadVideoWithComments(value) {
  return {
    type: types.LOAD_VIDEO_WITH_COMMENTS,
    payload: value
  };
}

//-----------------------------------
// player
//-----------------------------------
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
