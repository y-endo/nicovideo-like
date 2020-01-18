// components/Header.tsx
/**
 * ヘッダーコンポーネント
 * @packageDocumentation
 */

import * as React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header className="header">
    <Link to="/" className="header__link">
      <h1 className="header__title">ニコニコ動画風YouTubeプレイヤー</h1>
    </Link>
  </header>
);

export default Header;
