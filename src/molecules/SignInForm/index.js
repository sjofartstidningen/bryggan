// @flow
import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import type { SignInCredentials } from '../../types/firebase';
import {
  Wrapper,
  Container,
  TitleContainer,
  Title,
  SigninContainer,
  Form,
  FormGroup,
  Label,
  Input,
  InputDetail,
  SubmitButtonContainer,
  SubmitButton,
  SubmitButtonText,
} from './components';
import ProfilePicture from './ProfilePicture';
import ProgressBar from '../../atoms/ProgressBar';

type FormikSetSubmitting = boolean => void;
type FormikSetErrors = (validation: {
  [x: 'email' | 'password']: string,
}) => void;

type Props = {
  onSignIn: (cred: SignInCredentials) => void | Promise<void>,
  onSignInError: (err: Error) => { email?: string, password?: string },
};

type State = {};

class SignInForm extends PureComponent<Props, State> {
  state = {};

  handleSubmit = async (
    values: SignInCredentials,
    {
      setErrors,
      setSubmitting,
    }: { setSubmitting: FormikSetSubmitting, setErrors: FormikSetErrors },
  ) => {
    try {
      await this.props.onSignIn(values);
    } catch (err) {
      const validationError = this.props.onSignInError(err);
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
      errors.email = 'Felaktig e-mail';
    }

    if (!values.password) {
      errors.password = 'Lösenord krävs';
    }

    return errors;
  };

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          remember: true,
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
        }) => {
          const emailValid = !(touched.email && errors.email);
          const passwordValid = !(touched.password && errors.password);

          return (
            <Wrapper>
              <Container error={!emailValid || !passwordValid}>
                <ProfilePicture
                  email={values.email}
                  error={!emailValid || !passwordValid}
                />

                <TitleContainer>
                  <Title>Bryggan</Title>
                </TitleContainer>

                <SigninContainer>
                  <Form noValidate autoComplete="on" onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoCorrect="off"
                        autoCapitalize="off"
                        autoComplete="email"
                        modifiers={[!emailValid && 'error'].filter(Boolean)}
                      />
                      {!emailValid && (
                        <InputDetail modifiers={['error']}>
                          {errors.email}
                        </InputDetail>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="password">Lösenord</Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="current-password"
                        modifiers={[!passwordValid && 'error'].filter(Boolean)}
                      />
                      {!passwordValid && (
                        <InputDetail modifiers={['error']}>
                          {errors.password}
                        </InputDetail>
                      )}
                    </FormGroup>

                    <SubmitButtonContainer>
                      <SubmitButton
                        type="submit"
                        disabled={
                          isSubmitting || !values.email || !values.password
                        }
                      >
                        <SubmitButtonText show={!isSubmitting}>
                          Logga in
                        </SubmitButtonText>
                        {isSubmitting && <ProgressBar width="50%" />}
                      </SubmitButton>
                    </SubmitButtonContainer>
                  </Form>
                </SigninContainer>
              </Container>
            </Wrapper>
          );
        }}
      />
    );
  }
}

export { SignInForm as default };
