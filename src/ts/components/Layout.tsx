// components/Layout.tsx
/**
 * レイアウトコンポーネント
 * @packageDocumentation
 */

import * as React from 'react';

import Header from './Header';
import SvgSymbol from './SvgSymbol';

type Props = {
  content: React.ReactElement;
};

const Layout: React.FC<Props> = props => (
  <>
    <Header />
    <main className="main">{props.content}</main>
    <SvgSymbol />
  </>
);

export default Layout;
