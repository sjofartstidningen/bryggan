import React, { Component } from 'react';
import standard from '../../containers/standard';

class SignIn extends Component {
  state = {
    containerId: 'put-lock-here',
  };

  render() {
    return <div id={this.state.containerId} />;
  }
}

export default standard(SignIn);
