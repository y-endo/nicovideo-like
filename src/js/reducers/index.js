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

for (let i = 0; i < 100; i++) {
  const minutes = Math.floor(i / 60);
  const seconds = i - minutes * 60;
  initialState.watch.comments.push({
    value: `コメント${i}`,
    currentTime: `00:0${minutes}:${('0' + seconds).slice(-2)}`
  });
}

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
