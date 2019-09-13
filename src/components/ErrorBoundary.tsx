import React, {
  Component,
  PropsWithChildren,
  ErrorInfo,
  useEffect,
  useState,
} from 'react';
import { isRedirect } from '@reach/router';
import rafSchd from 'raf-schd';

export interface ErrorFallbackProps {
  error: Error;
  retry: () => void;
}

interface ErrorBoundaryProps {
  onError?: (error: Error, info: ErrorInfo, retry: () => void) => void;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface ErrorBoundaryState {
  error: Error | null;
}

const ErrorBoundaryEmptyFallback: React.FC = () => null;

/**
 * Standard ErrorBoundary to catch errors happening in render. Pass in a
 * fallback in order to
 *
 * @export
 * @class ErrorBoundary
 * @extends {Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState>}
 */
export class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static defaultProps: Partial<ErrorBoundaryProps> = {
    onError: () => {},
    fallback: ErrorBoundaryEmptyFallback,
  };

  static getDerivedStateFromError(
    error: Error,
  ): Partial<ErrorBoundaryState> | null {
    if (isRedirect(error)) return null;
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (isRedirect(error)) throw error;
    this.props.onError!(error, info, this.resetErrorBoundary);
  }

  resetErrorBoundary = () => this.setState(() => ({ error: null }));

  render() {
    const { children } = this.props;
    const { error } = this.state;

    const Fallback = this.props.fallback!;

    if (error != null)
      return <Fallback error={error} retry={this.resetErrorBoundary} />;
    return children;
  }
}

const Retry = ({
  errorCount,
  maxRetries,
  error,
  retry,
  fallback: Fallback,
}: ErrorFallbackProps & {
  errorCount: number;
  maxRetries: number;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}) => {
  const scheduledRetry = rafSchd(retry);
  useEffect(() => {
    if (errorCount < maxRetries) scheduledRetry();
  });

  if (Fallback && errorCount > maxRetries) {
    return <Fallback error={error} retry={retry} />;
  }

  return null;
};

export const ErrorBoundaryWithRefresh = ({
  maxRetries = 5,
  fallback,
  onError,
  children,
}: PropsWithChildren<ErrorBoundaryProps & { maxRetries?: number }>) => {
  const [errorCount, setErrorCount] = useState(0);

  const handleError = (error: Error, info: ErrorInfo, retry: () => void) => {
    setErrorCount(c => c + 1);
    if (onError) onError(error, info, retry);
  };

  return (
    <ErrorBoundary
      onError={handleError}
      fallback={props => (
        <Retry
          {...props}
          errorCount={errorCount}
          maxRetries={maxRetries}
          fallback={fallback}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
