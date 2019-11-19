import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled, { DefaultTheme } from 'styled-components';
import { spacing, color } from '../styles/theme';
import { animated, fadeIn } from '../styles/animations';
import { useAuthState } from '../hooks/use-auth';
import { VisuallyHidden } from './VisuallyHidden';
import { profile } from './__generated__/profile';

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
  const { data } = useQuery<profile>(PROFILE_QUERY);
  if (!state.matches('authenticated')) return null;

  let profilePicture;
  if (data) {
    profilePicture = data.getCurrentAccount.profilePhotoUrl || undefined;
  }

  return (
    <ProfileButton
      type="button"
      profilePicture={profilePicture}
      background={background}
      onClick={onClick}
      {...rest}
    >
      <VisuallyHidden>Context menu</VisuallyHidden>
    </ProfileButton>
  );
};

const PROFILE_QUERY = gql`
  query profile {
    getCurrentAccount {
      profilePhotoUrl
    }
  }
`;
