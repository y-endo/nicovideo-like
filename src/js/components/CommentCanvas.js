import React from 'react';
import PropTypes from 'prop-types';
import { TweenMax, TimelineMax, Linear } from 'gsap/all';
import moment from 'moment';
import 'moment-duration-format';

import getCanvasLineHeight from '@/utility/getCanvasLineHeight';

export default class CommentCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.canvasContext = null;
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
    this.rowHeight = this.canvas.current.height / 10;
    // 画面にコメントが10行収まるフォントサイズ
    this.fontSize = this.rowHeight * getCanvasLineHeight;

    this.canvasContext = this.canvas.current.getContext('2d');
    this.canvasContext.font = `bold ${this.fontSize}px Meiryo, メイリオ`;
    this.canvasContext.fillStyle = '#fff';

    this.renderCanvas();
  }

  registerEventHandler() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize() {
    const parent = this.canvas.current.parentNode;

    this.canvas.current.width = parent.offsetWidth;
    this.canvas.current.height = parent.offsetHeight;
  }

  createTimeline() {
    if (this.canvasContext === null) return;
    const commentPosition = {};
    this.timeline.clear();
    // this.props.comments.forEach(comment => {
    const comments = [
      { value: 'コメント1-1', currentTime: '00:00:00' },
      { value: 'コメント1-2', currentTime: '00:00:05' },
      { value: 'コメント1-3', currentTime: '00:00:00' },
      { value: 'コメント1-4', currentTime: '00:00:10' },
      { value: 'コメント1-5', currentTime: '00:00:00' },
      { value: 'コメント1-6', currentTime: '00:00:30' },
      { value: 'コメント1-7', currentTime: '00:00:00' },
      { value: 'コメント1-8', currentTime: '00:01:00' },
      { value: 'コメント1-9', currentTime: '00:04:00' },
      { value: 'コメント1-10', currentTime: '00:00:00' },
      { value: 'コメント1-11', currentTime: '00:00:00' },
      { value: 'コメント1-12', currentTime: '00:00:00' }
    ];
    comments.forEach(comment => {
      const commentWidth = this.canvasContext.measureText(comment.value).width;

      // テキストのY位置、同じ時間に投稿されたコメントを1行ずつずらす
      if (commentPosition[comment.currentTime] === void 0) commentPosition[comment.currentTime] = 0;
      commentPosition[comment.currentTime] += this.rowHeight;
      if (commentPosition[comment.currentTime] > this.rowHeight * 10) {
        commentPosition[comment.currentTime] = this.rowHeight;
      }

      const text = {
        x: this.canvas.current.width,
        y: commentPosition[comment.currentTime]
      };

      this.timeline.add(
        TweenMax.to(text, 2, {
          x: -commentWidth,
          ease: Linear.easeNone,
          onUpdate: () => {
            this.canvasContext.fillText(comment.value, text.x, text.y);
          }
        }),
        parseInt(moment.duration(comment.currentTime, 'HH:mm:ss').format('ss'), 10)
      );
    });
  }

  playTimeline() {
    this.timeline.play();
  }

  pauseTimeline() {
    this.timeline.pause();
  }

  renderCanvas() {
    this.canvasContext.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height);
    requestAnimationFrame(this.renderCanvas.bind(this));
  }
}

CommentCanvas.propTypes = {
  getCurrentTime: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired
};
