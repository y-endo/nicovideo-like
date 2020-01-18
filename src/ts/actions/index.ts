// actions/index.ts
/**
 * アクションのまとめ
 * @packageDocumentation
 */

import * as actionTypes from '~/constants/ActionTypes';
import { actionCreatorFactory } from 'typescript-fsa';
import { youtube, Comment } from '~/interfaces';

const actionCreator = actionCreatorFactory();

/**
 * search
 */
export const setSearchIsLoading = actionCreator<boolean>(actionTypes.SET_SEARCH_IS_LOADING);
export const searchVideo = actionCreator<{ query: string; result: youtube.dataAPI.search.List }>(actionTypes.SEARCH_VIDEO);

/**
 * pickedVideos
 */
export const setPickedIsLoaded = actionCreator<boolean>(actionTypes.SET_PICKED_IS_LOADED);
export const pickVideoWithComments = actionCreator<youtube.dataAPI.videos.Resource[]>(actionTypes.LOAD_VIDEO_WITH_COMMENTS);

/**
 * player
 */
export const loadComments = actionCreator<Comment[]>(actionTypes.LOAD_COMMENTS);
export const postComment = actionCreator<Comment>(actionTypes.POST_COMMENT);
