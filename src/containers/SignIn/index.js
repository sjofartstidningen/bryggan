import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { authSignIn } from '../../store/user/actions';
import * as constants from '../../store/user/constants';
import SignInContainer from './SignInContainer';
import SignInForm from './SignInForm';
import Loader from '../../components/Loader';

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
    remember: true,
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

    return (
      <SignInContainer>
        {(authState === constants.AUTH_UNAUTHENTICATED ||
          authState === constants.AUTH_ERROR) && (
          <SignInForm
            email={email}
            password={password}
            remember={remember}
            error={error && error.message}
            onInputChange={this.handleInputChange}
            onCheckboxChange={this.handleCheckboxChange}
            onSubmit={this.handleSubmit}
          />
        )}

        {authState === constants.AUTH_IN_PROGRESS && <Loader />}

        {authState === constants.AUTH_SUCCESS && <Redirect to="/" />}
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
