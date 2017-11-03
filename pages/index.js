import React, { Component } from 'react';
import securePage from '../hoc/securePage';

class Index extends Component {
  static async getInitialProps(ctx) {
    const state = ctx.store.getState();
    return { state };
  }

  render() {
    return <pre>{JSON.stringify(this.props, null, 2)}</pre>;
  }
}

export default securePage(Index);
