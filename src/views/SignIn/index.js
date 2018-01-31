import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten, modularScale } from 'polished';
import { Main } from '../../components/MainGrid';
import { Title } from '../../components/Typography';

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Form = styled.form`
  width: 20rem;
  max-width: 100%;
  border: 1px solid ${lighten(0.8, '#1a1a1a')};
  padding: 1em;
`;

const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
`;

const LabelText = styled.span`
  font-size: 1em;
`;

const Input = styled.input`
  min-width: 70%;
  margin-left: auto;
  border: 1px solid ${lighten(0.8, '#1a1a1a')};
  padding: 0.2em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  font-size: ${modularScale(-1)};
  line-height: 1;
`;

class SignIn extends Component {
  static propTypes = {
    message: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    message: null,
  };

  state = {
    inputs: {
      email: '',
      password: '',
    },
  };

  componentDidMount() {}

  handleSubmit = async e => {
    const { target } = e;
    e.preventDefault();

    const { email, password } = this.state.inputs;

    try {
      await this.props.onSubmit(email, password);
    } catch (err) {
      this.clearForm();
      target.reset();
      // void
    }
  };

  handleChange = field => ({ target }) => {
    const inputs = {
      ...this.state.inputs,
      [field]: target.value,
    };

    this.setState(() => ({ inputs }));
  };

  clearForm = () => {
    const inputs = Object.keys(this.state.inputs).reduce(
      (acc, field) => ({
        ...acc,
        [field]: '',
      }),
      {},
    );

    this.setState(() => ({ inputs }));
  };

  render() {
    const { message } = this.props;
    const { email, password } = this.state.inputs;

    return (
      <Main>
        <Title>Sign in</Title>

        <FormWrapper>
          <Form onSubmit={this.handleSubmit}>
            <Label htmlFor="sign-in__email">
              <LabelText>E-post</LabelText>{' '}
              <Input
                type="email"
                id="sign-in__email"
                name="email"
                value={email}
                onChange={this.handleChange('email')}
              />
            </Label>

            <Label htmlFor="sign-in__password" name="password">
              <LabelText>Lösenord</LabelText>{' '}
              <Input
                type="password"
                id="sign-in__password"
                name="password"
                value={password}
                onChange={this.handleChange('password')}
              />
            </Label>

            {message && <p>{message}</p>}

            <button type="submit">Logga in</button>
          </Form>
        </FormWrapper>
      </Main>
    );
  }
}

export default SignIn;
