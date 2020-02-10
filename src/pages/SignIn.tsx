import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { useInput, usePersistedState } from '@fransvilhelm/hooks';
import localforage from 'localforage';
import { spacing, font, size, color } from '../styles/theme';
import { transition } from '../styles/utils';
import { VisuallyHidden } from '../components/VisuallyHidden';
import { Dropbox, ArrowRightCircle } from '../components/Icons';
import { LOCALSTORAGE_POST_SIGN_IN_KEY } from '../constants';
import { useAuth } from '../hooks/use-auth';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 50vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: ${spacing('24')};
  padding-left: ${spacing('4')};
  padding-right: ${spacing('4')};
`;

const DropboxLink = styled.a`
  border-radius: 4px;
  padding: ${spacing('2')} ${spacing('8')};
  font-family: ${font('body')};
  font-size: ${size('lg')};
  text-decoration: none;
  color: ${color('white')};
  background-color: ${color('highlight')};
`;

const DropboxIcon = styled(Dropbox)`
  margin-right: ${spacing('1')};
`;

const ToggleMethodButton = styled.button`
  border: none;
  margin-top: ${spacing('2')};
  padding: ${spacing('2')};
  font-size: ${size('sm')};
  color: ${p => transparentize(0.5, color('black')(p))};
  background-color: transparent;
  cursor: pointer;
`;

const TokenForm = styled.form`
  display: flex;
  width: 100%;
  max-width: calc(${spacing('48')} * 2);
  border: 2px solid white;
  border-radius: 4px;
  overflow: hidden;
  ${transition('border')};

  &:focus-within {
    outline: none;
    border-color: ${color('highlight')};
  }
`;

const TokenLabel = styled.label`
  flex: 1;
  width: 100%;
`;

const TokenInput = styled.input`
  height: ${spacing('10')};
  width: 100%;
  border: none;
  padding: ${spacing('2')};
  font-family: ${font('body')};
  font-size: ${size('base')};
  color: ${color('black')};
  background-color: ${color('shade')};

  ${transition('color')};

  &::placeholder {
    color: ${color('black')};
    opacity: 0.75;
  }

  &:focus {
    outline: none;
  }

  &[readonly] {
    color: ${p => transparentize(0.5, color('black')(p))};
  }
`;

const SubmitButton = styled.button`
  height: ${spacing('10')};
  width: auto;
  margin: 0;
  border: none;
  padding: 0 ${spacing('4')};
  font-family: ${font('body')};
  font-size: ${size('base')};
  color: ${color('black')};
  background-color: ${color('shade')};
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:focus {
    outline: none;
    background-color: ${color('highlight')};
  }
`;

const AuthError = styled.div`
  color: ${color('warning')};
  width: 100%;
  max-width: calc(${spacing('64')} * 1.5);
  text-align: center;
`;

enum SignInMethod {
  link,
  paste,
}

const SignIn: React.FC = () => {
  const location = useLocation<{ from?: string }>();
  const history = useHistory();
  const [state, auth] = useAuth();
  const [signInMethod, setSignInMethod] = usePersistedState(SignInMethod.link);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const input = useInput('');

  const handleClick = async () => {
    if (location && location.state && location.state.from) {
      await localforage.setItem(LOCALSTORAGE_POST_SIGN_IN_KEY, {
        from: location.state.from,
      });
    }

    auth.authorize();
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSubmitting(true);
    auth.signIn(input.value);
  };

  useEffect(() => {
    if (!isSubmitting) return;

    switch (state.value) {
      case 'unauthenticated':
        setIsSubmitting(false);
        break;

      case 'authenticated':
        const to = location.state.from || '/';
        history.replace(to);
        break;
    }
  }, [isSubmitting, state.value, location, history]);

  return (
    <Wrapper>
      {signInMethod === SignInMethod.link && (
        <>
          <DropboxLink as="button" onClick={handleClick}>
            <DropboxIcon /> Sign in with Dropbox
          </DropboxLink>
          <ToggleMethodButton
            onClick={() => setSignInMethod(SignInMethod.paste)}
          >
            Or paste in Dropbox access token
          </ToggleMethodButton>
        </>
      )}

      {signInMethod === SignInMethod.paste && (
        <>
          <TokenForm onSubmit={handleSubmit}>
            <TokenLabel htmlFor="sign-in-token">
              <VisuallyHidden>Access token</VisuallyHidden>
              <TokenInput
                type="text"
                id="sign-in-token"
                placeholder="Paste in access token"
                {...input}
              />
            </TokenLabel>
            <SubmitButton type="submit" disabled={isSubmitting}>
              <VisuallyHidden>Sign in </VisuallyHidden>
              <ArrowRightCircle />
            </SubmitButton>
          </TokenForm>
          <ToggleMethodButton
            onClick={() => setSignInMethod(SignInMethod.link)}
          >
            Or sign in via link
          </ToggleMethodButton>
          {state.value === 'unauthenticated' && state.context.error && (
            <AuthError>
              Could not sign in, access token probably invalid{' '}
              <small>(Reason: {state.context.error.message})</small>
            </AuthError>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default SignIn;
