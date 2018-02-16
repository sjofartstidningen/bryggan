// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Logotype from '../../components/Logotype';
import {
  SignInGrid,
  SignInSection,
  Form,
  LogotypeContainer,
  Title,
  Fieldset,
  InputContainer,
  TextInputLabel,
  LabelText,
  TextInput,
  SubmitButton,
  CheckboxLabel,
  CheckboxInput,
  CheckboxLabelText,
} from './components';
import type { SignInCredentials } from '../../types';

type Props = {
  onSubmit: (credentials: SignInCredentials) => Promise<void>,
};

type FormikSetSubmitting = boolean => void;
type FormikSetErrors = (validation: { [x: string]: string }) => void;

class SignIn extends Component<Props, *> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = async (
    values: SignInCredentials,
    {
      setSubmitting,
      setErrors,
    }: { setSubmitting: FormikSetSubmitting, setErrors: FormikSetErrors },
  ) => {
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

  handleValidation = (values: SignInCredentials) => {
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
