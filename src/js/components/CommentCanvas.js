import React from 'react';
import PropTypes from 'prop-types';
import { TweenMax, TimelineMax, Linear } from 'gsap/all';
import moment from 'moment';
import 'moment-duration-format';

import getCanvasLineHeight from '@/utility/getCanvasLineHeight';
import getRandomInteger from '@/utility/getRandomInteger';

export default class CommentCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.canvasContext = null;
    this.commentMaxRow = 20;
    this.timeline = new TimelineMax({ paused: true });
  }

  render() {
    this.createTimeline();
    return <canvas className="comment-canvas" ref={this.canvas}></canvas>;
  }

  componentDidMount() {
    this.registerEventHandler();
    this.handleResize();

    // コメントを1行分の高さ
    this.rowHeight = this.canvas.current.height / this.commentMaxRow;
    // 画面にコメントが10行収まるフォントサイズ
    this.fontSize = this.rowHeight * getCanvasLineHeight;

    this.canvasContext = this.canvas.current.getContext('2d');
    this.canvasContext.font = `bold ${this.fontSize}px Meiryo, メイリオ`;
    this.canvasContext.fillStyle = '#fff';

    this.renderCanvas();
  }

  componentWillUnmount() {
    this.timeline.kill();
    this.timeline.clear();
    cancelAnimationFrame(this.renderCanvasFrame);
  }

  /**
   * イベント登録
   */
  registerEventHandler() {
    window.addEventListener('resize', this.handleResize);
  }

  /**
   * リサイズイベント
   */
  handleResize() {
    const parent = this.canvas.current.parentNode;

    this.canvas.current.width = parent.offsetWidth;
    this.canvas.current.height = parent.offsetHeight;
  }

  /**
   * コメントのタイムライン作成(TimelineMax)
   */
  createTimeline() {
    if (this.canvasContext === null) return;
    const commentPosition = {};
    this.timeline.kill();
    this.timeline.clear();

    this.props.comments.forEach(comment => {
      const commentWidth = this.canvasContext.measureText(comment.value).width;

      // テキストのY位置、同じ時間に投稿されたコメントはcommentMaxRow行分まで重ならないようにする
      if (commentPosition[comment.currentTime] === void 0)
        commentPosition[comment.currentTime] = { positions: this.getRandomCommentPosition(), count: -1 };
      commentPosition[comment.currentTime].count += 1;
      const { positions, count } = commentPosition[comment.currentTime];

      // 同じ時間に投稿されたコメントがcommentMaxRowを超えた場合はランダムな位置
      const y = count >= this.commentMaxRow ? positions[getRandomInteger(0, this.commentMaxRow - 1)] : positions[count];

      // TweenMaxで動かす用の疑似テキストオブジェクト
      const text = {
        x: this.canvas.current.width,
        y
      };

      this.timeline.add(
        TweenMax.to(text, 3, {
          x: -commentWidth,
          ease: Linear.easeNone,
          onUpdate: () => {
            this.canvasContext.fillText(comment.value, text.x, text.y);
          }
        }),
        parseInt(moment.duration(comment.currentTime, 'HH:mm:ss').format('ss'), 10)
      );
    });

    // 動画の再生位置と同期させる
    this.seekTimeline(this.props.getCurrentTime());
  }

  /**
   * コメントタイムライン再生
   */
  playTimeline() {
    this.seekTimeline(this.props.getCurrentTime());
    this.timeline.play();
  }

  /**
   * コメントタイムライン一時停止
   */
  pauseTimeline() {
    this.timeline.pause();
  }

  /**
   * コメントタイムラインスキップ
   * @param {Number} seconds 秒数
   */
  seekTimeline(seconds) {
    this.timeline.seek(seconds);
  }

  /**
   * Canvasを描画する
   */
  renderCanvas() {
    this.canvasContext.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
    this.renderCanvasFrame = requestAnimationFrame(this.renderCanvas.bind(this));
  }

  /**
   * 1画面に収まる分のコメントy位置を配列で返す
   */
  getRandomCommentPosition() {
    const positions = [];

    // コメントの1~10行目までの位置
    for (let index = 1; index <= this.commentMaxRow; index++) {
      positions.push(this.rowHeight * index);
    }

    // 配列シャッフル
    for (let index = positions.length - 1; index >= 0; index--) {
      const rand = Math.floor(Math.random() * (index + 1));
      [positions[index], positions[rand]] = [positions[rand], positions[index]];
    }

    return positions;
  }
}

CommentCanvas.propTypes = {
  getCurrentTime: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired
};
