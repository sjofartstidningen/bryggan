import React, { useState } from 'react';
import { useLocation, Route, RouteProps, Redirect } from 'react-router-dom';
import { useTimeout } from '../hooks/use-timeout';
import { useAuthState } from '../hooks/use-auth2';
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
  const state = useAuthState();
  const [showFallback, setShowFallback] = useState(false);

  useTimeout(() => setShowFallback(true), timeout);

  let kids: React.ReactNode;

  switch (state.value) {
    case 'authenticated':
      kids = children;
      break;

    case 'idle':
    case 'initialCheck':
    case 'authenticating':
      kids = showFallback ? fallback : null;
      break;

    case 'unauthenticated':
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
