import React from 'react';

import FirestoreManager from '@/utility/FirestoreManager';
import fetchYouTubeVideos from '@/utility/fetchYouTubeVideos';

import Layout from '@/components/Layout';
import SearchForm from '@/containers/SearchForm';
import VideoItem from '@/components/VideoItem';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pickupVideos: []
    };
  }

  render() {
    let videoItems;

    videoItems = this.state.pickupVideos.map(data => {
      return (
        <VideoItem
          key={data.id}
          id={data.id}
          title={data.snippet.title}
          thumbnail={data.snippet.thumbnails.high.url}
          channelName={data.snippet.channelTitle}
          publishedAt={data.snippet.publishedAt}
        />
      );
    });

    return (
      <Layout
        page={
          <section className="content">
            <SearchForm />
            <p>コメントの多い動画</p>
            <div className="videos-container">{videoItems}</div>
          </section>
        }
      />
    );
  }

  componentDidMount() {
    const videoId = [];

    FirestoreManager.getDocuments('comments', {
      orderBy: {
        key: 'commentCounter',
        order: 'desc'
      },
      limit: 12
    }).then(documents => {
      documents.forEach(document => videoId.push(document.id));

      fetchYouTubeVideos(videoId).then(json => {
        this.setState({ pickupVideos: json.items });
      });
    });
  }
}
