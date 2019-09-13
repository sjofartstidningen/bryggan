import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { useDropboxAuth } from 'hooks/useDropbox';
import { DropboxAuthStage } from 'hooks/useDropbox/authReducer';
import { useTimeout } from 'hooks/useTimeout';

interface AuthenticatedProps extends RouteComponentProps {
  signInUri: string;
  fallback?: React.ReactElement;
  timeout?: number;
}

export const Authenticated: React.FC<AuthenticatedProps> = ({
  signInUri,
  fallback = null,
  timeout = 300,
  navigate,
  location,
  children,
}) => {
  const auth = useDropboxAuth();
  const [showFallback, setShowFallback] = useState(false);

  useTimeout(() => setShowFallback(true), timeout);

  useEffect(() => {
    if (auth.stage === DropboxAuthStage.unauthorized && navigate) {
      const from = location && location.pathname;
      navigate(signInUri, { state: { from }, replace: true });
    }
  }, [signInUri, auth.stage, navigate, location]);

  switch (auth.stage) {
    case DropboxAuthStage.authorized:
      return <>{children}</>;

    case DropboxAuthStage.unknown:
      if (!showFallback) return null;
      return <>{fallback}</>;

    case DropboxAuthStage.unauthorized:
    default:
      return (
        <Link to={signInUri} state={{ from: location && location.pathname }}>
          You need to sign in
        </Link>
      );
  }
};
