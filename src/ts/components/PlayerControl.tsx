// components/PlayerControl.tsx
/**
 * 動画プレイヤーのコントロールコンポーネント
 * @packageDocumentation
 */

import * as React from 'react';

import debounce from '~/utils/debounce';
import convertDuration from '~/utils/convertDuration';

export interface PlayerControlHandlers {
  initialize: () => void;
  handlePlayerStateChange: (event: YT.OnStateChangeEvent) => void;
}

type Props = {
  ref: React.RefObject<PlayerControlHandlers>;
  playVideo: YT.Player['playVideo'];
  pauseVideo: YT.Player['pauseVideo'];
  seekTo: YT.Player['seekTo'];
  getDuration: YT.Player['getDuration'];
  getCurrentTime: YT.Player['getCurrentTime'];
  getVolume: () => { value: number; isMuted: boolean } | undefined;
  mute: YT.Player['mute'];
  unMute: YT.Player['unMute'];
  setVolume: YT.Player['setVolume'];
  timeFormat: string;
};

const PlayerControl: React.RefForwardingComponent<PlayerControlHandlers, Props> = (props, ref) => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [currentTime, setCurrentTime] = React.useState<string>('0');
  const [duration, setDuration] = React.useState<string>('0');
  const [volume, setVolume] = React.useState<number>(0);
  const [isMuted, setIsMuted] = React.useState<boolean>(false);
  const [seekDraggingValue, setSeekDraggingValue] = React.useState<number>(0);
  const [isSeekDragging, setIsSeekDragging] = React.useState<boolean>(false);
  const setStateCurrentTimeFrame = React.useRef<number>(0);

  /**
   * componentDidMount
   */
  React.useEffect(() => {
    setStateCurrentTime();

    /**
     * componentWillUnmount
     */
    return () => {
      cancelAnimationFrame(setStateCurrentTimeFrame.current);
    };
  }, []);

  /**
   * 初期化処理
   */
  const initialize = () => {
    setStateDurationOnce();
    setStateVolume();
  };

  /**
   * 再生ボタンのクリックイベント
   */
  const handlePlayClick = () => {
    props.playVideo();
  };

  /**
   * 一時停止ボタンのクリックイベント
   */
  const handlePauseClick = () => {
    props.pauseVideo();
  };

  /**
   * 10秒巻き戻すのクリックイベント
   */
  const handleRewindClick = () => {
    props.seekTo(props.getCurrentTime() - 10, true);
  };

  /**
   * 10秒進むのクリックイベント
   */
  const handleSkipClick = () => {
    props.seekTo(props.getCurrentTime() + 10, true);
  };

  /**
   * ミュートボタンのクリックイベント
   */
  const handleMuteClick = () => {
    if (isMuted) {
      props.unMute();
      setIsMuted(false);
    } else {
      props.mute();
      setIsMuted(true);
    }
  };

  /**
   * 動画のシークバー変更イベント
   * @param event イベントオブジェクト
   */
  const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.currentTarget.value, 10);

    setIsSeekDragging(true);
    setSeekDraggingValue(value);

    debounce(() => {
      props.seekTo(value, true);
    }, 1000)();
  };

  /**
   * 音量のバー変更イベント
   * @param event イベントオブジェクト
   */
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.currentTarget.value, 10);

    props.setVolume(value);
    setVolume(value);
  };

  /**
   * YouTubeAPIのstateChangeイベント
   * @param event イベントオブジェクト
   */
  const handlePlayerStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === 1) {
      setIsPlaying(true);
    } else if (event.data === 0 || event.data === 2) {
      setIsPlaying(false);
    }

    if (event.data === 1 && isSeekDragging) {
      setIsSeekDragging(false);
    }
  };

  /**
   * ローカルステートのcurrentTimeを設定
   */
  const setStateCurrentTime = () => {
    const time = isSeekDragging ? seekDraggingValue : props.getCurrentTime();
    const formattedCurrentTime = convertDuration.durationToFormat(time, props.timeFormat);

    setCurrentTime(formattedCurrentTime);

    setStateCurrentTimeFrame.current = requestAnimationFrame(setStateCurrentTime);
  };

  /**
   * ローカルステートのdurationとcurrentTimeを設定
   * 初期化のタイミングで一度だけ実行
   */
  const setStateDurationOnce = () => {
    setCurrentTime(convertDuration.durationToFormat(0, props.timeFormat));
    setDuration(convertDuration.durationToFormat(props.getDuration(), props.timeFormat));
  };

  /**
   * ローカルステートのvolumeを変更
   */
  const setStateVolume = () => {
    const volume = props.getVolume();

    if (volume === void 0) return;

    setVolume(volume.value);
    setIsMuted(volume.isMuted);
  };

  React.useImperativeHandle(ref, () => ({
    initialize,
    handlePlayerStateChange
  }));

  return (
    <div className="player-control">
      <div className="player-seek">
        <input
          type="range"
          min="0"
          max={props.getDuration()}
          step="1"
          className="player-seek__bar"
          value={isSeekDragging ? seekDraggingValue : props.getCurrentTime()}
          onChange={handleSeekChange}
        />
        <div className="player-duration">
          <span className="player-duration__current">{currentTime}</span>/<span className="player-duration__all">{duration}</span>
        </div>
      </div>
      <div className="player-buttons">
        {isPlaying ? (
          <button className="player-buttons__play" onClick={handlePauseClick}>
            <div className="button-inner">
              <svg viewBox="0 0 512 512" className="icon-pause">
                <use xlinkHref="#icon-pause"></use>
              </svg>
            </div>
          </button>
        ) : (
          <button className="player-buttons__play" onClick={handlePlayClick}>
            <div className="button-inner">
              <svg viewBox="0 0 512 512" className="icon-play">
                <use xlinkHref="#icon-play"></use>
              </svg>
            </div>
          </button>
        )}
        <button className="player-buttons__rewind" onClick={handleRewindClick}>
          <div className="button-inner">
            <svg viewBox="0 0 48 48" className="icon-rewind">
              <use xlinkHref="#icon-skip"></use>
            </svg>{' '}
            10
          </div>
        </button>
        <button className="player-buttons__skip" onClick={handleSkipClick}>
          <div className="button-inner">
            10{' '}
            <svg viewBox="0 0 48 48" className="icon-skip">
              <use xlinkHref="#icon-skip"></use>
            </svg>
          </div>
        </button>
        <div className="player-volume">
          <button className="player-volume__mute" onClick={handleMuteClick}>
            <div className="button-inner">
              <svg viewBox="0 0 18 18" className="icon-volume">
                {isMuted ? <use xlinkHref="#icon-mute"></use> : <use xlinkHref="#icon-unmute"></use>}
              </svg>
            </div>
          </button>
          <input type="range" className="player-volume__range" min="0" max="100" step="1" value={volume} onChange={handleVolumeChange} />
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(PlayerControl);
