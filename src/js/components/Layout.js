import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import SvgSymbol from './SvgSymbol';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Header />
        <main className="main">{this.props.content}</main>
        <SvgSymbol />
      </>
    );
  }
}

Layout.propTypes = {
  content: PropTypes.element.isRequired
};
