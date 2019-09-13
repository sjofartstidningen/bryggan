import React, { useEffect, useState } from 'react';
import { RouteComponentProps, navigate, WindowLocation } from '@reach/router';
import qs from 'qs';
import localforage from 'localforage';
import { useDropboxAuth } from 'hooks/useDropbox';
import { DropboxAuthStage } from 'hooks/useDropbox/authReducer';
import { useTimeout } from 'hooks/useTimeout';

interface AuthHandlerProps extends RouteComponentProps {
  fallback: React.ReactElement;
}

const DropboxAuthHandler: React.FC<AuthHandlerProps> = ({
  fallback,
  location,
}) => {
  const auth = useDropboxAuth();
  const [showFallback, setShowFallback] = useState(false);

  useTimeout(() => setShowFallback(true), 300);
  useEffect(() => {
    const run = async () => {
      const state = await getStoredState(location);
      auth.handleAuthentication(state.from);
    };

    run();
  });

  useEffect(() => {
    const run = async () => {
      const state = await getStoredState(location);

      switch (auth.stage) {
        case DropboxAuthStage.unauthorized:
          navigate('/sign-in', { state, replace: true });
          break;
      }
    };

    run();
  }, [location, auth.stage]);

  if (auth.stage === DropboxAuthStage.unknown && showFallback) {
    return <>{fallback}</>;
  }

  if (auth.stage === DropboxAuthStage.authorized) {
    return <p>Sucess</p>;
  }

  return null;
};

const getStoredState = async (location?: WindowLocation) => {
  const query: { state?: string } =
    qs.parse((location && location.search) || '', {
      ignoreQueryPrefix: true,
    }) || {};

  const state: { from?: string } = query.state
    ? await localforage.getItem(query.state)
    : {};

  return state;
};

export default DropboxAuthHandler;
