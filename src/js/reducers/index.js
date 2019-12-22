import { combineReducers } from 'redux';
import * as types from '@/constants/ActionTypes';

const initialState = {
  top: {
    searchQuery: '',
    searchResultData: {
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
  watch: {
    comments: []
  }
};

function topReducer(state = initialState.top, action) {
  switch (action.type) {
    case types.SEARCH_VIDEO:
      return { ...state, searchQuery: action.payload.query, searchResultData: action.payload.data };
    default:
      return state;
  }
}

function watchReducer(state = initialState.watch, action) {
  switch (action.type) {
    case types.POST_COMMENT:
      return { ...state, comments: state.comments.concat(action.payload.comment) };
    default:
      return state;
  }
}

export default combineReducers({
  top: topReducer,
  watch: watchReducer
});
