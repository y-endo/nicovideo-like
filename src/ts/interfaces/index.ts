// interfaces/index.ts
/**
 * 汎用的なinterface or typeのまとめ
 * @packageDocumentation
 */

/**
 * 動画のコメント
 */
export interface Comment {
  id: string;
  currentTime: string;
  value: string;
}

/**
 * YouTube API
 */
export namespace youtube {
  export namespace dataAPI {
    export namespace videos {
      export interface Resource {
        kind: string;
        etag: string;
        id: string;
        snippet: {
          publishedAt: string;
          channelId: string;
          title: string;
          description: string;
          thumbnails: {
            [key: string]: {
              url: string;
              width: number;
              height: number;
            };
          };
          channelTitle: string;
          tags: string[];
          categoryId: string;
        };
        contentDetails: {
          duration: string;
          dimension: string;
          definition: string;
          caption: string;
          licensedContent: boolean;
          regionRestriction: {
            allowed: string[];
            blocked: string[];
          };
          contentRating: {
            mpaaRating: string;
            tvpgRating: string;
            bbfcRating: string;
            chvrsRating: string;
            eirinRating: string;
            cbfcRating: string;
            fmocRating: string;
            icaaRating: string;
            acbRating: string;
            oflcRating: string;
            fskRating: string;
            kmrbRating: string;
            djctqRating: string;
            russiaRating: string;
            rtcRating: string;
            ytRating: string;
          };
        };
        status: {
          uploadStatus: string;
          failureReason: string;
          rejectionReason: string;
          privacyStatus: string;
          license: string;
          embeddable: boolean;
          publicStatsViewable: boolean;
        };
        statistics: {
          viewCount: number;
          likeCount: number;
          dislikeCount: number;
          favoriteCount: number;
          commentCount: number;
        };
        player: {
          embedHtml: string;
        };
        topicDetails: {
          topicIds: string[];
          relevantTopicIds: string[];
        };
        recordingDetails: {
          locationDescription: string;
          location: {
            latitude: number;
            longitude: number;
            altitude: number;
          };
          recordingDate: string;
        };
        fileDetails: {
          fileName: string;
          fileSize: number;
          fileType: string;
          container: string;
          videoStreams: {
            widthPixels: number;
            heightPixels: number;
            frameRateFps: number;
            aspectRatio: number;
            codec: string;
            bitrateBps: number;
            rotation: string;
            vendor: string;
          }[];
          audioStreams: {
            channelCount: number;
            codec: string;
            bitrateBps: number;
            vendor: string;
          }[];
          durationMs: number;
          bitrateBps: number;
          recordingLocation: {
            latitude: number;
            longitude: number;
            altitude: number;
          };
          creationTime: string;
        };
        processingDetails: {
          processingStatus: string;
          processingProgress: {
            partsTotal: number;
            partsProcessed: number;
            timeLeftMs: number;
          };
          processingFailureReason: string;
          fileDetailsAvailability: string;
          processingIssuesAvailability: string;
          tagSuggestionsAvailability: string;
          editorSuggestionsAvailability: string;
          thumbnailsAvailability: string;
        };
        suggestions: {
          processingErrors: string[];
          processingWarnings: string[];
          processingHints: string[];
          tagSuggestions: {
            tag: string;
            categoryRestricts: string[];
          }[];
          editorSuggestions: string[];
        };
      }
      export interface List {
        kind: string;
        etag: string;
        nextPageToken: string;
        prevPageToken: string;
        pageInfo: {
          totalResults: number;
          resultsPerPage: number;
        };
        items: Resource[];
      }
    }
    export namespace search {
      export interface Resource {
        kind: string;
        etag: string;
        id: {
          kind: string;
          videoId: string;
          channelId: string;
          playlistId: string;
        };
        snippet: {
          publishedAt: string;
          channelId: string;
          title: string;
          description: string;
          thumbnails: {
            [key: string]: {
              url: string;
              width: number;
              height: number;
            };
          };
          channelTitle: string;
        };
      }
      export interface List {
        kind: string;
        etag: string;
        nextPageToken: string;
        prevPageToken: string;
        pageInfo: {
          totalResults: number;
          resultsPerPage: number;
        };
        items: Resource[];
      }
    }
  }
}

/**
 * StoreのState
 */
export interface StoreState {
  pickedVideos: {
    isLoaded: boolean;
    videoWithComments: youtube.dataAPI.videos.Resource[];
  };
  search: {
    query: string;
    result: youtube.dataAPI.search.List;
    isLoading: boolean;
  };
  player: {
    comments: Comment[];
  };
}
