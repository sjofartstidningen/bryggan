import React, { useState, useEffect } from 'react';
import { render, fireEvent } from '../../utils/test-utils';
import { ErrorBoundary, ErrorBoundaryWithRefresh } from '../ErrorBoundary';

beforeEach(() => {
  console.error = jest.fn();
});

it('should catch render errors and display fallback ui', async () => {
  const ThrowingComp = () => {
    throw new Error('He he he');
  };

  const { findByText } = render(
    <ErrorBoundary fallback={({ error }) => <p>{error.message}</p>}>
      <ThrowingComp />
    </ErrorBoundary>,
  );

  const message = await findByText(/he he he/i);
  expect(message).toBeInTheDocument();
});

it('should call onError handler on error', async () => {
  const ThrowingComp = () => {
    throw new Error('He he he');
  };

  const handleError = jest.fn();

  const { findByText } = render(
    <ErrorBoundary
      fallback={({ error }) => <p>{error.message}</p>}
      onError={handleError}
    >
      <ThrowingComp />
    </ErrorBoundary>,
  );

  await findByText(/he he he/i);
  expect(handleError).toHaveBeenCalled();
  expect(handleError).toHaveBeenCalledWith(
    expect.any(Error),
    expect.objectContaining({ componentStack: expect.any(String) }),
    expect.any(Function),
  );
});

it('should be possible to retry by using static resetErrorBoundary', async () => {
  const ThrowingComp = ({ shouldError }: any) => {
    if (shouldError) {
      throw new Error(`He he he`);
    } else {
      return <p>Success</p>;
    }
  };

  const Fallback = ({ retry, onClick }: any) => {
    const handleClick = () => {
      onClick();
      retry();
    };
    return <button onClick={handleClick}>Retry</button>;
  };

  const Comp = () => {
    const [shouldError, setShouldError] = useState(true);
    return (
      <>
        <ErrorBoundary
          fallback={({ retry }) => (
            <Fallback retry={retry} onClick={() => setShouldError(false)} />
          )}
        >
          <ThrowingComp shouldError={shouldError} />
        </ErrorBoundary>
      </>
    );
  };

  const { findByText } = render(<Comp />);

  const retry = await findByText(/retry/i);
  fireEvent.click(retry);

  const success = await findByText(/success/i);
  expect(success).toBeInTheDocument();
});

it('<ErrorBoundaryWithRefresh /> it should retry on failure', async () => {
  const Fallback = () => {
    return <p>Retried 5 times</p>;
  };

  const ThrowingComponent = () => {
    useEffect(() => {
      throw new Error('He he he');
    });
    return null;
  };

  const handleError = jest.fn();
  const maxRetries = 5;

  const Comp = () => {
    return (
      <ErrorBoundaryWithRefresh
        maxRetries={maxRetries}
        fallback={Fallback}
        onError={handleError}
      >
        <ThrowingComponent />
      </ErrorBoundaryWithRefresh>
    );
  };

  const { findByText } = render(<Comp />);

  await findByText(/retried \d+ times/i);
  expect(handleError.mock.calls.length).toBeGreaterThanOrEqual(maxRetries);
});
