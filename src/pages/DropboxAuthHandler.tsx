import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import localforage from 'localforage';
import { useTimeout } from '../hooks/use-timeout';
import { useAuthReciever, useAuth, AuthStatus } from '../hooks/use-auth';
import { leadingSlash } from '../utils';
import { LOCALSTORAGE_POST_SIGN_IN_KEY, PATH_SIGN_IN } from '../constants';

interface AuthHandlerProps {
  fallback: React.ReactElement;
}

const DropboxAuthHandler: React.FC<AuthHandlerProps> = ({ fallback }) => {
  const history = useHistory();
  const auth = useAuth();
  const [showFallback, setShowFallback] = useState(false);

  useAuthReciever();

  useTimeout(() => setShowFallback(true), 300);

  useEffect(() => {
    let hasCancelled = false;
    switch (auth.status) {
      case AuthStatus.unauthorized:
        history.replace(leadingSlash(PATH_SIGN_IN));
        break;

      case AuthStatus.authorized:
        (async () => {
          const data = await localforage.getItem<{ from: string } | undefined>(
            LOCALSTORAGE_POST_SIGN_IN_KEY,
          );

          if (hasCancelled) return;
          const to = (data && data.from) || '/';
          history.replace(to);
        })();
    }

    return () => {
      hasCancelled = true;
    };
  }, [auth.status, history]);

  if (showFallback) {
    return <>{fallback}</>;
  }

  return null;
};

export default DropboxAuthHandler;
