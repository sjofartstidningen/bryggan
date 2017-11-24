import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { authSignIn } from '../../store/user/actions';
import * as constants from '../../store/user/constants';
import SignInContainer from './SignInContainer';
import SignInForm from './SignInForm';

class SignIn extends Component {
  static propTypes = {
    authState: PropTypes.oneOf(Object.values(constants)).isRequired,
    authSignIn: PropTypes.func.isRequired,
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    error: null,
  };

  state = {
    email: '',
    password: '',
    remember: process.env.NODE_ENV === 'production',
  };

  handleInputChange = e => {
    const { value, name } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  handleCheckboxChange = () =>
    this.setState(({ remember }) => ({ remember: !remember }));

  handleSubmit = e => {
    e.preventDefault();
    const { email, password, remember } = this.state;
    this.props.authSignIn({ email, password, remember });
  };

  render() {
    const { authState, error } = this.props;
    const { email, password, remember } = this.state;

    if (authState === constants.AUTH_SUCCESS) return <Redirect to="/" />;

    return (
      <SignInContainer>
        <SignInForm
          email={email}
          password={password}
          remember={remember}
          error={error && error.message}
          onInputChange={this.handleInputChange}
          onCheckboxChange={this.handleCheckboxChange}
          onSubmit={this.handleSubmit}
          loading={authState === constants.AUTH_IN_PROGRESS}
        />
      </SignInContainer>
    );
  }
}

const mapStateToProps = state => ({
  ...state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ authSignIn }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
