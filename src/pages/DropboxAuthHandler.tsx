import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import localforage from 'localforage';
import { useTimeout } from '../hooks/use-timeout';
import { useAuth } from '../hooks/use-auth';
import { LOCALSTORAGE_POST_SIGN_IN_KEY, PATH_SIGN_IN } from '../constants';
import { useAsyncEffect } from '../hooks/use-async-effect';

interface AuthHandlerProps {
  fallback: React.ReactElement;
}

const DropboxAuthHandler: React.FC<AuthHandlerProps> = ({ fallback }) => {
  const [state, auth] = useAuth();
  const location = useLocation();
  const history = useHistory();
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    auth.checkAuthState(location);
  });

  useTimeout(() => setShowFallback(true), 300);

  useAsyncEffect(
    async hasCancelled => {
      switch (state.value) {
        case 'unauthenticated':
          history.replace(PATH_SIGN_IN);
          break;

        case 'authenticated':
          (async () => {
            const data = await localforage.getItem<
              { from: string } | undefined
            >(LOCALSTORAGE_POST_SIGN_IN_KEY);

            if (hasCancelled()) return;
            const to = data?.from ?? '/';
            localforage
              .removeItem(LOCALSTORAGE_POST_SIGN_IN_KEY)
              .catch(() => null);
            history.replace(to);
          })();
      }
    },
    [state, history],
  );

  if (showFallback) {
    return <>{fallback}</>;
  }

  return null;
};

export default DropboxAuthHandler;
