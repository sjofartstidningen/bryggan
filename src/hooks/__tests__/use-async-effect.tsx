import React, { useState } from 'react';
import { useAsyncEffect } from '../use-async-effect';
import { render, fireEvent, waitFor } from '@testing-library/react';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

it('should fire of an async effect', async () => {
  const Component = () => {
    const [called, setCalled] = useState(false);
    useAsyncEffect(async () => {
      if (called) return;

      await delay(0);
      setCalled(true);
    });

    return <p>{called ? 'CALLED' : 'NOT CALLED'}</p>;
  };

  const { findByText } = render(<Component />);

  const called = await findByText('CALLED');
  expect(called).toBeInTheDocument();
});

it('should provide a hasCancelled callback to effect', async () => {
  const Component: React.FC<{ callback: () => void }> = ({ callback }) => {
    const [count, setCount] = useState(0);

    useAsyncEffect(
      async (hasCancelled) => {
        if (count > 0) return;
        await delay(0);
        if (hasCancelled()) callback();
      },
      [count],
    );

    return <button onClick={() => setCount(count + 1)}>Click me</button>;
  };

  const cb = jest.fn();
  const { getByText } = render(<Component callback={cb} />);

  const button = getByText('Click me');
  fireEvent.click(button);

  await waitFor(() => expect(cb).toHaveBeenCalledTimes(1));
});

it('it can also handle functions that come with a `cancel` method attached', () => {
  const onCancel = jest.fn();

  const Component = () => {
    const [count, setCount] = useState(0);

    const effect = async () => {};
    effect.cancel = onCancel;

    useAsyncEffect(effect, [count]);

    return <button onClick={() => setCount(count + 1)}>Click me</button>;
  };

  const { getByText } = render(<Component />);

  const button = getByText('Click me');
  fireEvent.click(button);

  expect(onCancel).toHaveBeenCalled();
});
