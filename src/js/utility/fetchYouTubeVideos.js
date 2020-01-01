import { YOUTUBE_API_KEY } from '@/constants/Config';

export default function fetchYouTubeVideos(id) {
  return new Promise(resolve => {
    const parameter = `part=snippet&key=${YOUTUBE_API_KEY}&id=${String(id)}`;

    fetch('https://www.googleapis.com/youtube/v3/videos?' + parameter, { credentials: 'include' })
      .then(response => response.json())
      .then(json => {
        resolve(json);
      });
  });
}
