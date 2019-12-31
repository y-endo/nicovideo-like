import { combineReducers } from 'redux';
import * as types from '@/constants/ActionTypes';

const initialState = {
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
    }
  },
  player: {
    comments: []
  },
  ui: {}
};

function searchReducer(state = initialState.search, action) {
  switch (action.type) {
    case types.SEARCH_VIDEO:
      return { ...state, query: action.payload.query, result: action.payload.result };
    default:
      return state;
  }
}

function playerReducer(state = initialState.player, action) {
  switch (action.type) {
    case types.LOAD_COMMENTS:
      return { ...state, comments: action.payload.comments };
    case types.POST_COMMENT:
      return { ...state, comments: state.comments.concat(action.payload.comment) };
    default:
      return state;
  }
}

export default combineReducers({
  search: searchReducer,
  player: playerReducer
});
