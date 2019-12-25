import React from 'react';
import PropTypes from 'prop-types';

import Player from '@/components/Player';
import SvgSymbol from '@/components/SvgSymbol';

export default class Watch extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="content">
          <Player {...this.props} />
        </section>
        <SvgSymbol />
      </React.Fragment>
    );
  }
}

Watch.propTypes = {
  match: PropTypes.object.isRequired
};
