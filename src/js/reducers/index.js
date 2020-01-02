import { combineReducers } from 'redux';
import * as types from '@/constants/ActionTypes';

const initialState = {
  pickedVideos: {
    isLoaded: false,
    videoWithComments: []
  },
  search: {
    query: '',
    result: {
      kind: undefined,
      etag: undefined,
      nextPageToken: undefined,
      prevPageToken: undefined,
      pageInfo: {
        totalResults: undefined,
        resultsPerPage: undefined
      },
      items: []
    },
    isLoading: false
  },
  player: {
    comments: []
  }
};

function pickedVideosReducer(state = initialState.pickedVideos, action) {
  switch (action.type) {
    case types.SET_PICKED_IS_LOADED:
      return { ...state, isLoaded: action.payload };
    case types.LOAD_VIDEO_WITH_COMMENTS:
      return { ...state, videoWithComments: action.payload };
    default:
      return state;
  }
}

function searchReducer(state = initialState.search, action) {
  switch (action.type) {
    case types.SET_SEARCH_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case types.SEARCH_VIDEO:
      return { ...state, query: action.payload.query, result: action.payload.result };
    default:
      return state;
  }
}

function playerReducer(state = initialState.player, action) {
  switch (action.type) {
    case types.LOAD_COMMENTS:
      return { ...state, comments: action.payload };
    case types.POST_COMMENT:
      return { ...state, comments: state.comments.concat(action.payload) };
    default:
      return state;
  }
}

export default combineReducers({
  pickedVideos: pickedVideosReducer,
  search: searchReducer,
  player: playerReducer
});
