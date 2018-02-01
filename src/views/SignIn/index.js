import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale, darken } from 'polished';
import { Formik } from 'formik';
import Logotype from '../../components/Logotype';
import { ax } from '../../styles';

const SignInGrid = styled.div`
  width: 25rem;
  height: 100vh;
  margin: 0 auto;
  font-family: ${ax('font.sansSerif')};
  color: ${ax('color.black')};
`;

const SignInSection = styled.div`
  padding: 2em;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;

const LogotypeContainer = styled.div`
  width: 10rem;
  height: auto;
`;

const Title = styled.h1`
  margin: 1em 0;
  font-size: ${modularScale(2)};
  font-weight: 400;
`;

const Fieldset = styled.fieldset`
  display: block;
  width: 100%;
  border: none;
  padding: 0;
`;

const InputContainer = styled.div`
  margin: 1.5em 0;
  font-size: 1em;
  text-align: center;
`;

const TextInputLabel = styled.label`
  position: relative;
  display: block;
`;

const LabelText = styled.span`
  display: block;
  width: 100%;
  margin-bottom: 0.5em;
  font-size: ${modularScale(-1)};
  text-align: left;
`;

const TextInput = styled.input`
  display: inline-block;
  min-width: 3.125em;
  width: 100%;
  max-width: 35em;
  border: 2px solid
    ${p => (p.valid ? ax('color.grey')(p) : ax('color.warning')(p))};
  border-radius: 4px;
  padding: 0 1em;
  font-size: 1em;
  font-family: ${ax('font.sansSerif')};
  line-height: 2;
  transition: border-color 0.2s ease-in-out;
  user-select: none;

  &:focus {
    outline: none;
    border-color: ${ax('color.brand')};
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  border: 2px solid ${p => darken(0.05, ax('color.brand')(p))};
  border-radius: 4px;
  padding: 0 1em;
  font-size: 1em;
  font-family: ${ax('font.sansSerif')};
  line-height: 2;
  color: white;
  background-color: ${ax('color.brand')};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  user-select: none;

  &:hover {
    background-color: ${p => darken(0.05, ax('color.brand')(p))};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${modularScale(0)};
`;

const CheckboxInput = styled.input`
  margin-right: 0.5em;
`;

const CheckboxLabelText = styled.span``;

class SignIn extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await this.props.onSubmit(values);
    } catch (err) {
      const validationError = (() => {
        switch (err.code) {
          case 'auth/invalid-email':
            return { email: 'Felaktig e-mail' };
          case 'auth/user-disabled':
            return { email: 'Ditt användarkonto har inaktiverats' };
          case 'auth/user-not-found':
            return { email: 'Din e-mail finns inte registrerad' };
          case 'auth/wrong-password':
            return { password: 'Felaktigt lösenord' };
          default:
            return {};
        }
      })();

      setErrors(validationError);
      setSubmitting(false);
    }
  };

  handleValidation = values => {
    const errors = {};
    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!values.email) {
      errors.email = 'E-mail krävs';
    } else if (!emailRegExp.test(values.email)) {
      errors.email = 'E-mailadressen är inte korrekt';
    }

    if (!values.password) {
      errors.password = 'Lösenord krävs';
    }

    return errors;
  };

  render() {
    return (
      <SignInGrid>
        <SignInSection>
          <Formik
            initialValues={{
              email: '',
              password: '',
              showPassword: false,
              remember: false,
            }}
            onSubmit={this.handleSubmit}
            validate={this.handleValidation}
            render={({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form
                id="sign-in-form"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="on"
              >
                <LogotypeContainer>
                  <Logotype />
                </LogotypeContainer>

                <Title>Logga in</Title>

                <Fieldset>
                  <InputContainer>
                    <TextInputLabel htmlFor="email">
                      <LabelText>E-post</LabelText>{' '}
                      <TextInput
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoCorrect="off"
                        autoCapitalize="off"
                        valid={!(touched.email && errors.email)}
                      />
                    </TextInputLabel>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                  </InputContainer>

                  <InputContainer>
                    <TextInputLabel htmlFor="password" name="password">
                      <LabelText>Lösenord</LabelText>{' '}
                      <TextInput
                        type={values.showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        valid={!(touched.password && errors.password)}
                      />
                    </TextInputLabel>

                    {touched.password &&
                      errors.password && <p>{errors.password}</p>}
                  </InputContainer>

                  <InputContainer>
                    <SubmitButton type="submit" disabled={isSubmitting}>
                      Logga in
                    </SubmitButton>
                  </InputContainer>

                  <InputContainer>
                    <CheckboxLabel htmlFor="remember">
                      <CheckboxInput
                        type="checkbox"
                        name="remember"
                        id="remember"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-checked={values.remember}
                        value={values.remember}
                      />{' '}
                      <CheckboxLabelText>Kom ihåg mig</CheckboxLabelText>
                    </CheckboxLabel>
                  </InputContainer>
                </Fieldset>
              </Form>
            )}
          />
        </SignInSection>
      </SignInGrid>
    );
  }
}

export default SignIn;
