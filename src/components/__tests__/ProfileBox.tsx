import React from 'react';
import { ProfileBox, PROFILE_QUERY } from '../ProfileBox';
import { render, fireEvent, wait } from '../../utils/test-utils';

const src = 'https://via.placeholder.com/100x100';
const mocks = [
  {
    request: { query: PROFILE_QUERY },
    result: {
      data: {
        currentAccount: { profilePhotoUrl: src, __typename: 'FullAccount' },
      },
    },
  },
];

it('renders a profile picture button', async () => {
  const { findByLabelText } = render(<ProfileBox label="button" />, { mocks });

  const btn = await findByLabelText(/button/i);
  expect(btn).toBeInTheDocument();

  await wait(() => {
    const { backgroundImage } = window.getComputedStyle(btn);
    if (!backgroundImage.includes(src)) {
      throw new Error('No background image yet');
    }
  });
  expect(btn).toHaveStyleRule('background-image', `url(${src})`);
});

it('accepts an on click handler', async () => {
  const onClick = jest.fn();
  const { findByLabelText } = render(
    <ProfileBox label="button" onClick={onClick} />,
    { mocks },
  );

  const btn = await findByLabelText(/button/i);

  fireEvent.click(btn);
  expect(onClick).toHaveBeenCalled();
});
