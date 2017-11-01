import React, { Component } from 'react';
import standard from '../containers/standard';

class Index extends Component {
  static async getInitialProps({ store }) {
    store.dispatch({ type: 'FAKE' });
    const state = store.getState();
    return { state };
  }

  render() {
    return <pre>{JSON.stringify(this.props, null, 2)}</pre>;
  }
}

export default standard(Index);
