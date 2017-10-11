import React, { Component } from 'react';

export default class Index extends Component {
  state = { name: 'World' };

  render() {
    return (
      <div>
        <h1>Hello {this.state.name}</h1>
      </div>
    );
  }
}
