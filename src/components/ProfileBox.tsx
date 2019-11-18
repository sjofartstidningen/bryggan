import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { spacing, color } from '../styles/theme';
import { animated, fadeIn } from '../styles/animations';
import { useAuthState } from '../hooks/use-auth2';
import { VisuallyHidden } from './VisuallyHidden';

interface ProfileButtonProps {
  profilePicture?: string;
  background?: keyof DefaultTheme['color'];
}

const ProfileButton = styled.button<ProfileButtonProps>`
  position: relative;
  display: block;
  width: ${spacing('10')};
  height: ${spacing('10')};
  border: none;
  padding: 0;
  border-radius: 100%;
  background-color: ${p => color(p.background || 'white')(p)};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${p =>
    p.profilePicture ? `url(${p.profilePicture})` : ''};

  ${animated(fadeIn)};

  &::after {
    content: '';
    position: absolute;
    top: -0.25em;
    left: -0.25em;
    width: calc(100% + 0.5em);
    height: calc(100% + 0.5em);
    border: 2px solid ${p => color(p.background || 'white')(p)};
    border-radius: 100%;
    opacity: 1;
    transition: border 0.3s ease-in-out;
  }

  &:hover::after,
  &:focus::after {
    border-color: ${color('highlight')};
  }

  &:focus {
    outline: none;
  }
`;

interface ProfileBoxProps extends React.HTMLAttributes<HTMLElement> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  background?: keyof DefaultTheme['color'];
}

export const ProfileBox: React.FC<ProfileBoxProps> = ({
  onClick,
  background,
  ...rest
}) => {
  const state = useAuthState();
  if (!state.matches('authenticated')) return null;

  return (
    <ProfileButton
      type="button"
      // profilePicture={auth.user.profile_photo_url}
      background={background}
      onClick={onClick}
      {...rest}
    >
      <VisuallyHidden>Context menu</VisuallyHidden>
    </ProfileButton>
  );
};
