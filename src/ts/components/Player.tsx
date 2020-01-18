// components/Player.tsx
/**
 * 動画プレイヤーコンポーネント
 * @packageDocumentation
 */

import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import CommentList from './CommentList';
import CommentForm from './CommentForm';
import CommentCanvas, { CommentCanvasHandlers } from './CommentCanvas';
import PlayerControl, { PlayerControlHandlers } from './PlayerControl';

import YouTubeIframeAPI from '~/utils/YouTubeIframeAPI';
import FirestoreManager from '~/utils/FirestoreManager';
import { StoreState, Comment } from '~/interfaces';

type Props = RouteComponentProps<{ id: string }> & {
  player: StoreState['player'];
  postComment: (value: Comment) => void;
  loadComments: (value: Comment[]) => void;
};

const Player: React.FC<Props> = props => {
  const [timeFormat, setTimeFormat] = React.useState<string>('mm:ss');
  const [isReady, setIsReady] = React.useState<boolean>(false);
  const commentCanvas = React.useRef<CommentCanvasHandlers>(null);
  const playerControl = React.useRef<PlayerControlHandlers>(null);
  let player: YT.Player | null = null;

  /**
   * componentDidMount
   */
  React.useEffect(() => {
    // YouTubeのiframe作成
    YouTubeIframeAPI.ready().then(() => {
      player = new YT.Player('player', {
        width: '1920',
        height: '1080',
        videoId: props.match.params.id,
        playerVars: {
          enablejsapi: 1,
          fs: 0, // 全画面禁止
          playsinline: 1,
          iv_load_policy: 3,
          controls: 0,
          modestbranding: 1,
          disablekb: 1
        },
        events: {
          onReady: handlePlayerReady,
          onStateChange: handlePlayerStateChange
        }
      });
    });

    // 動画のコメントデータを取得する
    FirestoreManager.getDocument('comments', props.match.params.id).then(document => {
      const data = document.data();
      if (data && data.comments) props.loadComments(data.comments);
    });

    /**
     * componentWillUnmount
     */
    return () => {
      props.loadComments([]);
    };
  }, []);

  /**
   * YouTubeのreadyイベント
   */
  const handlePlayerReady = () => {
    setIsReady(true);

    const duration = getDuration();
    if (duration >= 36000) {
      setTimeFormat('HH:mm:ss');
    } else if (duration >= 3600) {
      setTimeFormat('H:mm:ss');
    } else {
      setTimeFormat('mm:ss');
    }

    playerControl.current!.initialize();
  };

  /**
   * YouTubeAPIのstateChangeイベント
   * @param event イベントオブジェクト
   */
  const handlePlayerStateChange = (event: YT.OnStateChangeEvent) => {
    switch (event.data) {
      case -1:
        // 未開始
        if (commentCanvas.current !== null) commentCanvas.current.pauseTimeline();
        break;
      case 0:
        // 終了
        if (commentCanvas.current !== null) commentCanvas.current.pauseTimeline();
        break;
      case 1:
        // 再生中
        if (commentCanvas.current !== null) commentCanvas.current.playTimeline();
        break;
      case 2:
        // 一時停止
        if (commentCanvas.current !== null) commentCanvas.current.pauseTimeline();
        break;
      case 3:
        // バッファリング中
        if (commentCanvas.current !== null) commentCanvas.current.pauseTimeline();
        break;
      case 5:
        // 頭出し済み
        break;
    }

    if (playerControl.current !== null) playerControl.current.handlePlayerStateChange(event);
  };

  /**
   * 動画の長さ(秒)を取得
   */
  const getDuration = () => {
    if (!isReady) return -1;
    return player!.getDuration();
  };

  /**
   * 動画の現在の再生時間を取得
   */
  const getCurrentTime = () => {
    if (!isReady) return -1;
    if (player!.getPlayerState() === 0) return getDuration();
    return player!.getCurrentTime();
  };

  /**
   * 動画の音量を取得
   */
  const getVolume = () => {
    if (!isReady) return;
    return {
      value: player!.getVolume(),
      isMuted: player!.isMuted()
    };
  };

  /**
   * 動画の音量を設定
   * @param volume 音量
   */
  const setVolume = (volume: number) => {
    if (!isReady) return;
    player!.setVolume(volume);
  };

  /**
   * 動画を再生
   */
  const playVideo = () => {
    if (!isReady) return;
    player!.playVideo();
  };

  /**
   * 動画を一時停止
   */
  const pauseVideo = () => {
    if (!isReady) return;
    player!.pauseVideo();
  };

  /**
   * 動画をスキップ
   * @param seconds 再生位置(秒)
   */
  const seekTo = (seconds: number) => {
    if (!isReady) return;
    player!.seekTo(seconds, true);
    if (commentCanvas.current !== null) commentCanvas.current.seekTimeline(seconds);
  };

  /**
   * 動画をミュートにする
   */
  const mute = () => {
    if (!isReady) return;
    player!.mute();
  };

  /**
   * 動画のミュートを解除
   */
  const unMute = () => {
    if (!isReady) return;
    player!.unMute();
  };

  return (
    <div className="player-container">
      <div className="player-area">
        <div className="player-wrap">
          <CommentCanvas ref={commentCanvas} getCurrentTime={getCurrentTime} comments={props.player.comments} />
          <div id="player"></div>
        </div>
        <PlayerControl
          playVideo={playVideo}
          pauseVideo={pauseVideo}
          seekTo={seekTo}
          getDuration={getDuration}
          getCurrentTime={getCurrentTime}
          getVolume={getVolume}
          mute={mute}
          unMute={unMute}
          setVolume={setVolume}
          ref={playerControl}
          timeFormat={timeFormat}
        />
        <CommentForm getCurrentTime={getCurrentTime} postComment={props.postComment} videoId={props.match.params.id} />
      </div>
      <div className="comments">
        <CommentList comments={props.player.comments} getCurrentTime={getCurrentTime} timeFormat={timeFormat} />
      </div>
    </div>
  );
};

export default Player;
