import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import SvgSymbol from './SvgSymbol';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Header />
        <main className="main">{this.props.page}</main>
        <Footer />
        <SvgSymbol />
      </>
    );
  }
}

Layout.propTypes = {
  page: PropTypes.element.isRequired
};
