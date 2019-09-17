import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { useTimeout } from '../hooks/use-timeout';
import { useAuth, AuthStatus } from '../hooks/use-auth';
import { PATH_SIGN_IN } from '../constants';

interface AuthenticatedProps extends RouteComponentProps {
  fallback?: React.ReactElement;
  timeout?: number;
}

export const Authenticated: React.FC<AuthenticatedProps> = ({
  fallback = null,
  timeout = 300,
  navigate,
  location,
  children,
}) => {
  const auth = useAuth();
  const [showFallback, setShowFallback] = useState(false);

  useTimeout(() => setShowFallback(true), timeout);

  useEffect(() => {
    if (auth.status === AuthStatus.unauthorized && navigate) {
      const from = location && location.pathname;
      navigate(PATH_SIGN_IN, { state: { from }, replace: true });
    }
  }, [auth.status, navigate, location]);

  switch (auth.status) {
    case AuthStatus.authorized:
      return <>{children}</>;

    case AuthStatus.unknown:
    case AuthStatus.checking:
    case AuthStatus.checkingToken:
      if (!showFallback) return null;
      return <>{fallback}</>;

    case AuthStatus.unauthorized:
    default:
      return (
        <Link to={PATH_SIGN_IN} state={{ from: location && location.pathname }}>
          You need to sign in
        </Link>
      );
  }
};
