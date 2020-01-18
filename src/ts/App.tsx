// App.tsx
/**
 * App
 * @packageDocumentation
 */

import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Watch from '~/pages/Watch';

const App: React.FC = () => (
  <Router>
    <Route exact path="/" component={Home} />
    <Route exact path="/search/:query" component={Search} />
    <Route exact path="/search/:query/:pageToken" component={Search} />
    <Route exact path="/watch/:id" component={Watch} />
  </Router>
);

export default App;
