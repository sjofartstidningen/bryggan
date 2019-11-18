import React, { useEffect } from 'react';
import nock from 'nock';
import localforage from 'localforage';
import { Location } from 'history';
import { render } from '../../utils/test-utils';
import { LOCALSTORAGE_AUTH_KEY } from '../../constants';
import { useAuth } from '../use-auth';

const dropboxApi = nock('https://api.dropboxapi.com', {
  reqheaders: { authorization: /^bearer .+/i },
});

afterEach(async () => {
  await localforage.clear();
});

it('checks for initial auth state (localstorage)', async () => {
  dropboxApi
    .post('/2/check/user')
    .reply(200, (_, body: Record<string, any>) => ({ result: body.query }));

  await localforage.setItem(LOCALSTORAGE_AUTH_KEY, { accessToken: 'abc123' });

  const Comp: React.FC = () => {
    const [state, auth] = useAuth();

    useEffect(() => {
      auth.checkAuthState(({} as unknown) as any);
    });

    return <div>{state.matches('authenticated') && <p>Welcome!</p>}</div>;
  };

  const { findByText } = render(<Comp />);

  const signIn = await findByText(/welcome/i);
  expect(signIn).toBeInTheDocument();
});

it('checks for access token available on window.location', async () => {
  dropboxApi
    .post('/2/check/user')
    .reply(200, (_, body: Record<string, any>) => ({ result: body.query }));

  const Comp: React.FC = () => {
    const [state, auth] = useAuth();

    useEffect(() => {
      auth.checkAuthState(({
        search: '?access_token=abc123',
      } as unknown) as Location);
    });

    return <div>{state.matches('authenticated') && <p>Welcome!</p>}</div>;
  };

  const { findByText } = render(<Comp />);

  const signIn = await findByText(/welcome/i);
  expect(signIn).toBeInTheDocument();
});

it.todo('checks for an access token on window.location');
it.todo('sends a user to Dropbox authorization page');
it.todo('validates passed in access token');
it.todo('signs a user out');
