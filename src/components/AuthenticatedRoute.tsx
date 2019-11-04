import React, { useState } from 'react';
import { useLocation, Route, RouteProps, Redirect } from 'react-router-dom';
import { useTimeout } from '../hooks/use-timeout';
import { useAuth, AuthStatus } from '../hooks/use-auth';
import { PATH_SIGN_IN } from '../constants';

interface AuthenticatedProps {
  fallback?: React.ReactElement;
  timeout?: number;
}

export const AuthenticatedRoute: React.FC<RouteProps & AuthenticatedProps> = ({
  fallback = null,
  timeout = 300,
  children,
  ...routeProps
}) => {
  const location = useLocation();
  const auth = useAuth();
  const [showFallback, setShowFallback] = useState(false);

  useTimeout(() => setShowFallback(true), timeout);

  let kids: React.ReactNode;

  switch (auth.status) {
    case AuthStatus.authorized:
      kids = children;
      break;

    case AuthStatus.unknown:
    case AuthStatus.checking:
    case AuthStatus.checkingToken:
      kids = showFallback ? fallback : null;
      break;

    case AuthStatus.unauthorized:
      kids = (
        <Redirect
          to={{ pathname: PATH_SIGN_IN, state: { from: location.pathname } }}
        />
      );
      break;

    default:
      kids = null;
  }

  return <Route {...routeProps}>{kids}</Route>;
};
