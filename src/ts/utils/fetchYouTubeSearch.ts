// utils/fetchYouTubeSearch.ts
/**
 * YouTube DATA APIで動画を検索する
 * @packageDocumentation
 */

import { YOUTUBE_API_KEY } from '~/constants/Config';
import { youtube } from '~/interfaces';

interface SearchResult extends youtube.dataAPI.search.List {
  error?: boolean;
}

export default function fetchYouTubeSearch(query: string, pageToken: string = ''): Promise<SearchResult> {
  return new Promise(resolve => {
    const parameter = `part=snippet&key=${YOUTUBE_API_KEY}&maxResults=40&type=video&videoEmbeddable=true&q=${query}&pageToken=${pageToken}`;

    fetch('https://www.googleapis.com/youtube/v3/search?' + parameter, { credentials: 'include' })
      .then(response => response.json())
      .then(json => {
        resolve(json);
      });
  });
}
