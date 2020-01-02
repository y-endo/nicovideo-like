import React from 'react';
import PropTypes from 'prop-types';

import FirestoreManager from '@/utility/FirestoreManager';
import fetchYouTubeVideos from '@/utility/fetchYouTubeVideos';

import Loader from '@/components/Loader';
import VideoItem from '@/components/VideoItem';

export default class PickedVideos extends React.Component {
  render() {
    let videoItems;

    videoItems = this.props.pickedVideos.videoWithComments.map(data => {
      return (
        <VideoItem
          key={data.id}
          id={data.id}
          title={data.snippet.title}
          thumbnail={data.snippet.thumbnails.high.url}
          channelName={data.snippet.channelTitle}
          publishedAt={data.snippet.publishedAt}
          className={'flex-box-4col-pc__item flex-box-2col-sp__item'}
        />
      );
    });

    return (
      <div className="videos-container">
        {!this.props.pickedVideos.isLoaded && <Loader />}
        <p className="videos-container__title">コメントの多い動画</p>
        <div className="flex-box-4col-pc flex-box-2col-sp">{videoItems}</div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.pickedVideos.isLoaded) return;
    this.fetch();
  }

  async fetch() {
    const documents = await FirestoreManager.getDocuments('comments', {
      orderBy: {
        key: 'commentCounter',
        order: 'desc'
      },
      limit: 12
    })
      .then(documents => documents)
      .catch(error => error);

    if (!documents) return;

    const videoId = documents.map(document => document.id);

    const result = await fetchYouTubeVideos(videoId).then(json => json);

    if (result.error) return;

    this.props.setPickedIsLoaded(true);
    this.props.loadVideoWithComments(result.items);
  }
}

PickedVideos.propTypes = {
  pickedVideos: PropTypes.object.isRequired,
  setPickedIsLoaded: PropTypes.func.isRequired,
  loadVideoWithComments: PropTypes.func.isRequired
};
