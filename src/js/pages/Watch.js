import React from 'react';
import PropTypes from 'prop-types';

import Player from '@/components/Player';

export default class Watch extends React.Component {
  render() {
    return (
      <section className="content">
        <Player {...this.props} />
      </section>
    );
  }
}

Watch.propTypes = {
  match: PropTypes.object.isRequired
};
