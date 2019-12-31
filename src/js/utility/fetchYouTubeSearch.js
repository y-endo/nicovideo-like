import { YOUTUBE_API_KEY } from '@/constants/Config';

export default function fetchYouTubeSearch(query, pageToken = '') {
  return new Promise(resolve => {
    const parameter = `part=snippet&key=${YOUTUBE_API_KEY}&maxResults=40&type=video&videoEmbeddable=true&q=${query}&pageToken=${pageToken}`;

    fetch('https://www.googleapis.com/youtube/v3/search?' + parameter, { credentials: 'include' })
      .then(response => response.json())
      .then(json => {
        resolve(json);
      });
  });
}
