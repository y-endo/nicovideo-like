// index.tsx
/**
 * エントリーファイル
 * @packageDocumentation
 */

import 'whatwg-fetch';
import './utils/YouTubeIframeAPI';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);
