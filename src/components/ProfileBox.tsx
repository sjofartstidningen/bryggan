import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { spacing, color } from '../styles/theme';
import { animated, fadeIn } from '../styles/animations';
import { VisuallyHidden } from './VisuallyHidden';

interface ProfileBoxProps extends React.HTMLAttributes<HTMLElement> {
  label: string;
  profilePhotoUrl: string | null;
  background?: keyof DefaultTheme['color'];
}

export const ProfileBox: React.FC<ProfileBoxProps> = ({
  label,
  background,
  onClick,
  profilePhotoUrl,
  ...rest
}) => {
  return (
    <ProfileButton
      type="button"
      profilePhotoUrl={profilePhotoUrl}
      background={background}
      aria-label={label}
      onClick={onClick}
      {...rest}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
    </ProfileButton>
  );
};

interface ProfileButtonProps {
  profilePhotoUrl: string | null;
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
  background-image: url(${p => (p.profilePhotoUrl ? p.profilePhotoUrl : '')});

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
