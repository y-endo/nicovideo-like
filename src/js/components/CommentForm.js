import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" className="comment-form__input" ref={this.input} />
        <button className="comment-form__button">コメントする</button>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const value = this.input.current.value;
    const currentTime = this.props.getCurrentTime();

    if (value !== '' && typeof currentTime === 'number' && currentTime >= 0) {
      this.props.postComment({
        value,
        currentTime: moment.duration(currentTime, 'seconds').format('HH:mm:ss', { trim: false })
      });
      this.input.current.value = null;
    }
  }
}

CommentForm.propTypes = {
  getCurrentTime: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired
};
