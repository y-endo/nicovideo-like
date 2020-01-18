// utils/fetchYouTubeVideos.ts
/**
 * YouTube DATA APIで動画をIDから取得する
 * @packageDocumentation
 */

import { YOUTUBE_API_KEY } from '~/constants/Config';
import { youtube } from '~/interfaces';

interface VideosResult extends youtube.dataAPI.videos.List {
  error?: boolean;
}

export default function fetchYouTubeVideos(id: string[]): Promise<VideosResult> {
  return new Promise(resolve => {
    const parameter = `part=snippet&key=${YOUTUBE_API_KEY}&id=${String(id)}`;

    fetch('https://www.googleapis.com/youtube/v3/videos?' + parameter, { credentials: 'include' })
      .then(response => response.json())
      .then(json => {
        resolve(json);
      });
  });
}
