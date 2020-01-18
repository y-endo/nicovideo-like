// components/CommentCanvas.tsx
/**
 * 動画のコメントを出力するCanvasコンポーネント
 * @packageDocumentation
 */

import * as React from 'react';
import { TweenMax, TimelineMax, Linear } from 'gsap';

import getCanvasLineHeight from '~/utils/getCanvasLineHeight';
import getRandomInteger from '~/utils/getRandomInteger';
import convertDuration from '~/utils/convertDuration';
import { Comment } from '~/interfaces';

export interface CommentCanvasHandlers {
  playTimeline: () => void;
  pauseTimeline: () => void;
  seekTimeline: (seconds: number) => void;
}

type Props = {
  ref: React.RefObject<CommentCanvasHandlers>;
  getCurrentTime: YT.Player['getCurrentTime'];
  comments: Comment[];
};

const CommentCanvas: React.RefForwardingComponent<CommentCanvasHandlers, Props> = (props, ref) => {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  let canvasContext: CanvasRenderingContext2D | null = null;
  const commentMaxRow = 20;
  const timeline = new TimelineMax({ paused: true });
  let renderCanvasFrame = 0;
  let rowHeight = 0;

  /**
   * componentDidMount
   */
  React.useEffect(() => {
    registerEventHandler();
    updateCanvas();
    setTimeout(updateCanvas, 500);
    renderCanvas();

    /**
     * componentWillUnmount
     */
    return () => {
      timeline.kill();
      timeline.clear();
      cancelAnimationFrame(renderCanvasFrame);
    };
  }, []);

  /**
   * componentDidUpdate
   */
  React.useEffect(() => {
    createTimeline();
  }, [props.comments]);

  /**
   * イベント登録
   */
  const registerEventHandler = () => {
    window.addEventListener('resize', handleResize);
  };

  /**
   * リサイズイベント
   */
  const handleResize = () => {
    updateCanvas();
  };

  /**
   * コメントタイムライン再生
   */
  const playTimeline = () => {
    seekTimeline(props.getCurrentTime());
    timeline.play();
  };

  /**
   * コメントタイムライン一時停止
   */
  const pauseTimeline = () => {
    timeline.pause();
  };

  /**
   * コメントタイムラインスキップ
   */
  const seekTimeline = (seconds: number) => {
    timeline.seek(seconds);
  };

  /**
   * canvas設定の更新
   */
  const updateCanvas = (): void => {
    if (canvas.current === null) return;

    const parent = canvas.current.parentNode as HTMLElement;
    if (parent === null) return;

    canvas.current.width = parent.offsetWidth;
    canvas.current.height = parent.offsetHeight;

    // コメントを1行分の高さ
    rowHeight = canvas.current.height / commentMaxRow;
    // 画面にコメントが10行収まるフォントサイズ
    const fontSize = rowHeight * getCanvasLineHeight;

    canvasContext = canvas.current.getContext('2d');

    if (canvasContext !== null) {
      canvasContext.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'ヒラギノ角ゴ ProN W3'`;
      canvasContext.fillStyle = '#fff';
    }
  };

  /**
   * Canvasを描画する
   */
  const renderCanvas = () => {
    if (canvasContext !== null) canvasContext.clearRect(0, 0, canvas.current!.width, canvas.current!.height);
    renderCanvasFrame = requestAnimationFrame(renderCanvas);
  };

  /**
   * 1画面に収まる分のコメントy位置を配列で返す
   */
  const getRandomCommentPosition = (): number[] => {
    const positions = [];

    // コメントの1~10行目までの位置
    for (let index = 1; index <= commentMaxRow; index++) {
      positions.push(rowHeight * index);
    }

    // 配列シャッフル
    for (let index = positions.length - 1; index >= 0; index--) {
      const rand = Math.floor(Math.random() * (index + 1));
      [positions[index], positions[rand]] = [positions[rand], positions[index]];
    }

    return positions;
  };

  /**
   * コメントのタイムライン作成(TimelineMax)
   */
  const createTimeline = () => {
    if (canvas === null || canvas.current === null) return;
    if (canvasContext === null) return;

    const canvasCurrent = canvas.current;

    const commentPosition: { [key: string]: { positions: number[]; count: number } } = {};
    timeline.kill();
    timeline.clear();

    props.comments.forEach(comment => {
      const commentWidth = (canvasContext as CanvasRenderingContext2D).measureText(comment.value).width;

      // テキストのY位置、同じ時間に投稿されたコメントはcommentMaxRow行分まで重ならないようにする
      if (commentPosition[comment.currentTime] === void 0)
        commentPosition[comment.currentTime] = { positions: getRandomCommentPosition(), count: -1 };
      commentPosition[comment.currentTime].count += 1;
      const { positions, count } = commentPosition[comment.currentTime];

      // 同じ時間に投稿されたコメントがcommentMaxRowを超えた場合はランダムな位置
      const y = count >= commentMaxRow ? positions[getRandomInteger(0, commentMaxRow - 1)] : positions[count];

      // TweenMaxで動かす用の疑似テキストオブジェクト
      const text = {
        x: canvasCurrent.width,
        y
      };

      timeline.add(
        TweenMax.to(text, 3, {
          x: -commentWidth,
          ease: Linear.easeNone,
          onUpdate: () => {
            (canvasContext as CanvasRenderingContext2D).fillText(comment.value, text.x, text.y);
          }
        }),
        convertDuration.HHmmssToDuration(comment.currentTime)
      );
    });

    // 動画の再生位置と同期させる
    seekTimeline(props.getCurrentTime());
  };

  React.useImperativeHandle(ref, () => ({
    playTimeline,
    pauseTimeline,
    seekTimeline
  }));

  return <canvas className="comment-canvas" ref={canvas}></canvas>;
};

export default CommentCanvas;
