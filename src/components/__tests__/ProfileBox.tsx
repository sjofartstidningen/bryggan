import React from 'react';
import { ProfileBox } from '../ProfileBox';
import { render, fireEvent } from '../../utils/test-utils';

const src = 'https://via.placeholder.com/100x100';

it('renders a profile picture button', () => {
  const { getByLabelText } = render(
    <ProfileBox label="button" profilePhotoUrl={src} />,
    { skipAuth: true },
  );

  const btn = getByLabelText(/button/i);
  expect(btn).toBeInTheDocument();
  expect(btn).toHaveStyleRule('background-image', `url(${src})`);
});

it('accepts an on click handler', () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <ProfileBox label="button" profilePhotoUrl={src} onClick={onClick} />,
    { skipAuth: true },
  );

  const btn = getByText(/button/i);

  fireEvent.click(btn);
  expect(onClick).toHaveBeenCalled();
});
