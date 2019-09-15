import React, { useEffect, useState } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import localforage from 'localforage';
import { useTimeout } from 'hooks/useTimeout';
import { useAuthReciever, useAuth, AuthStage } from 'hooks/useAuth';
import { leadingSlash } from 'utils';
import { LOCALSTORAGE_POST_SIGN_IN_KEY, PATH_SIGN_IN } from '../constants';

interface AuthHandlerProps extends RouteComponentProps {
  fallback: React.ReactElement;
}

const DropboxAuthHandler: React.FC<AuthHandlerProps> = ({
  fallback,
  location,
}) => {
  const auth = useAuth();
  const [showFallback, setShowFallback] = useState(false);

  useAuthReciever(location);

  useTimeout(() => setShowFallback(true), 300);

  useEffect(() => {
    let hasCancelled = false;
    switch (auth.stage) {
      case AuthStage.unauthorized:
        navigate(leadingSlash(PATH_SIGN_IN), { replace: true });
        break;

      case AuthStage.authorized:
        (async () => {
          const data = await localforage.getItem<{ from: string } | undefined>(
            LOCALSTORAGE_POST_SIGN_IN_KEY,
          );

          if (hasCancelled) return;
          const to = (data && data.from) || '/';
          navigate(to, { replace: true });
        })();
    }

    return () => {
      hasCancelled = true;
    };
  }, [auth.stage]);

  if (showFallback) {
    return <>{fallback}</>;
  }

  return null;
};

export default DropboxAuthHandler;
