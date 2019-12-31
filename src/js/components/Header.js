import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <Link to="/" className="header__link">
          <h1 className="header__title">ニコニコ動画風YouTubeプレイヤー</h1>
        </Link>
      </header>
    );
  }
}
