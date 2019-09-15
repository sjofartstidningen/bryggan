import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { useTimeout } from 'hooks/useTimeout';
import { useAuth, AuthStage } from 'hooks/useAuth';
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
    if (auth.stage === AuthStage.unauthorized && navigate) {
      const from = location && location.pathname;
      navigate(PATH_SIGN_IN, { state: { from }, replace: true });
    }
  }, [auth.stage, navigate, location]);

  switch (auth.stage) {
    case AuthStage.authorized:
      return <>{children}</>;

    case AuthStage.unknown:
    case AuthStage.checking:
    case AuthStage.checkingToken:
      if (!showFallback) return null;
      return <>{fallback}</>;

    case AuthStage.unauthorized:
    default:
      return (
        <Link to={PATH_SIGN_IN} state={{ from: location && location.pathname }}>
          You need to sign in
        </Link>
      );
  }
};
