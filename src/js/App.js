import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Top from '@/containers/Top';
import Watch from '@/containers/Watch';

export default class App extends React.Component {
  render() {
    return (
      <main className="main">
        <Router>
          <Route exact path="/" component={Top} />
          <Route exact path="/watch/:id" component={Watch} />
        </Router>
      </main>
    );
  }
}
