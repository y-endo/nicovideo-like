// utils/YouTubeIframeAPI.ts
/**
 * YoutubeIframAPIの読み込み管理クラス
 * @packageDocumentation
 */

class YouTubeIframeAPI {
  private isLoaded: boolean;
  private isReady: boolean;
  private resolve: ((value: boolean) => void) | null;

  constructor() {
    this.isLoaded = false;
    this.isReady = false;
    this.resolve = null;
  }

  ready() {
    return new Promise(resolve => {
      this.resolve = resolve;

      if (this.isReady) resolve(true);
    });
  }

  onYouTubeIframeAPIReady() {
    this.isReady = true;

    if (this.resolve !== null) {
      this.resolve(true);
    }
  }

  load() {
    console.log('YouTubeIframeAPI - Load');
    if (this.isLoaded) return;
    this.isLoaded = true;

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag.parentNode !== null) firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
}

const api = new YouTubeIframeAPI();
(window as any).onYouTubeIframeAPIReady = api.onYouTubeIframeAPIReady.bind(api);
api.load();

export default api;
