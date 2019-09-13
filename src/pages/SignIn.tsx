import React, { useMemo } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import qs from 'qs';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { useInput, usePersistedState } from '@fransvilhelm/hooks';
import Cookies from 'universal-cookie';
import nanoid from 'nanoid';
import localforage from 'localforage';
import { spacing, font, size, color } from 'styles/theme';
import { transition } from 'styles/utils';
import { useDropboxAuth } from 'hooks/useDropbox';
import { DropboxAuthStage } from 'hooks/useDropbox/authReducer';
import { VisuallyHidden } from 'components/VisuallyHidden';
import { Dropbox, ArrowRightCircle } from 'components/Icons';
import { useAsyncLayoutEffect } from 'hooks/useAsyncEffect';
import { OAUTH_STATE_COOKIE, AUTH_HANDLER_PATH } from '../constants';

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

const cookies = new Cookies();

const SignIn: React.FC<RouteComponentProps> = ({ location }) => {
  const auth = useDropboxAuth();
  const [signInMethod, setSignInMethod] = usePersistedState(SignInMethod.link);
  const input = useInput('');
  const uid = useMemo(() => nanoid(), []);

  useAsyncLayoutEffect(async () => {
    const run = async () => {
      cookies.set(OAUTH_STATE_COOKIE, uid, {
        path: '/',
        maxAge: 1000 * 60 * 60,
      });
      if (location && location.state && location.state.from) {
        await localforage.setItem(uid, { from: location.state.from });
      }
    };

    run();
  }, [uid, location]);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    navigate(
      `${AUTH_HANDLER_PATH}?${qs.stringify({
        access_token: input.value,
        state: uid,
      })}`,
    );
  };

  return (
    <Wrapper>
      {signInMethod === SignInMethod.link && (
        <>
          <DropboxLink href={auth.loginUrl({ state: uid })}>
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
            <SubmitButton type="submit">
              <VisuallyHidden>Sign in </VisuallyHidden>
              <ArrowRightCircle />
            </SubmitButton>
          </TokenForm>
          <ToggleMethodButton
            onClick={() => setSignInMethod(SignInMethod.link)}
          >
            Or sign in via link
          </ToggleMethodButton>
          {auth.stage === DropboxAuthStage.unauthorized && auth.error && (
            <AuthError>
              Could not sign in, access token probably invalid{' '}
              <small>(Reason: {auth.error})</small>
            </AuthError>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default SignIn;
