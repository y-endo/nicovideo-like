// reducers/index.tsx
/**
 * reducerのまとめ
 * @packageDocumentation
 */

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { combineReducers } from 'redux';
import * as actions from '~/actions';
import { StoreState } from '~/interfaces';

const initialState: StoreState = {
  pickedVideos: {
    isLoaded: false,
    videoWithComments: []
  },
  search: {
    query: '',
    result: {
      kind: '',
      etag: '',
      nextPageToken: '',
      prevPageToken: '',
      pageInfo: {
        totalResults: 0,
        resultsPerPage: 0
      },
      items: []
    },
    isLoading: false
  },
  player: {
    comments: []
  }
};

const pickedVideosReducer = reducerWithInitialState(initialState.pickedVideos)
  .case(actions.setPickedIsLoaded, (state, payload) => {
    return { ...state, isLoaded: payload };
  })
  .case(actions.pickVideoWithComments, (state, payload) => {
    return { ...state, videoWithComments: payload };
  });

const searchReducer = reducerWithInitialState(initialState.search)
  .case(actions.setSearchIsLoading, (state, payload) => {
    return { ...state, isLoading: payload };
  })
  .case(actions.searchVideo, (state, payload) => {
    return { ...state, query: payload.query, result: payload.result };
  });

const playerReducer = reducerWithInitialState(initialState.player)
  .case(actions.loadComments, (state, payload) => {
    return { ...state, comments: payload };
  })
  .case(actions.postComment, (state, payload) => {
    return { ...state, comments: state.comments.concat(payload) };
  });

export default combineReducers({
  pickedVideos: pickedVideosReducer,
  search: searchReducer,
  player: playerReducer
});
