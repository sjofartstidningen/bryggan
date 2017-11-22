import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../store/auth/actions';

class SignIn extends Component {
  componentDidMount() {
    this.props.login();
  }

  render() {
    return <div />;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);
export default connect(null, mapDispatchToProps)(SignIn);
