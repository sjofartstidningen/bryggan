import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { useRect } from 'hooks/use-rect';
import { spacing, color, size } from 'styles/theme';
import { animated, fadeIn } from 'styles/animations';
import { truncate } from 'styles/utils';
import { PopUpOverlay } from './PopUpOverlay';
import { VisuallyHidden } from './VisuallyHidden';
import { useAuth, AuthStatus, useAuthSignOut } from 'hooks/use-auth';

const Profile = styled.div`
  position: relative;
`;

const ProfileButton = styled.button<{ profilePicture?: string }>`
  position: relative;
  width: ${spacing('10')};
  height: ${spacing('10')};
  border: none;
  padding: 0;
  border-radius: 100%;
  background-color: ${color('white')};
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
    border: 2px solid ${color('white')};
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

const StyledPopUpOverlay = styled(PopUpOverlay)<{ show?: boolean }>`
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.3s ease-in-out;

  ${p =>
    p.show &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    `}
`;

const ContextMenu = styled.ul`
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  width: calc(100vw - ${spacing('4')} * 2);
  max-width: ${spacing('48')};
  margin: 0;
  border: 1px solid ${color('shade')};
  border-radius: 0.25em;
  padding: ${spacing('0')};
  list-style: none;
  color: ${color('black')};
  font-size: ${size('sm')};
  background-color: ${color('white')};
  transform: translateX(-100%);
`;

const ContextMenuItem = styled.li`
  border-bottom: 1px solid ${color('shade')};

  &:last-child {
    border-bottom: none;
  }
`;

interface ContextMenuContentProps {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  mode?: 'warning';
}
const ContextMenuContent = styled.span<ContextMenuContentProps>`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  border: 0;
  padding: ${spacing('2')};
  font-size: ${size('xs')};
  text-align: left;
  background-color: ${color('white')};
  transition: background 0.3s ease-in-out;

  ${truncate};

  ${p =>
    p.mode === 'warning' &&
    css`
      color: ${color('warning')};
    `}

  ${p =>
    p.as === 'button' &&
    css`
      cursor: pointer;
      &:hover,
      &:focus {
        background-color: ${p => transparentize(0.5, color('shade')(p))};
      }

      &:focus {
        outline: none;
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border: 2px solid transparent;
        transition: border 0.3s ease-in-out;
      }

      &:focus::after {
        border-color: ${color('highlight')};
      }
    `}
`;

export const ProfileBox: React.FC = () => {
  const auth = useAuth();
  const signOut = useAuthSignOut();
  const [showContext, setShowContext] = useState(false);
  const profilePictureRef = useRef<HTMLButtonElement>(null);
  const rect = useRect(profilePictureRef);

  if (auth.status !== AuthStatus.authorized) return null;

  const contextPosition = rect && {
    top: rect.top + rect.height + 16,
    left: rect.right,
  };

  return (
    <Profile>
      <ProfileButton
        ref={profilePictureRef}
        type="button"
        profilePicture={auth.user.profile_photo_url}
        onClick={() => setShowContext(!showContext)}
      >
        <VisuallyHidden>Context menu</VisuallyHidden>
      </ProfileButton>
      <StyledPopUpOverlay
        show={showContext}
        preventScroll={showContext}
        onClick={() => setShowContext(false)}
      >
        <ContextMenu style={contextPosition}>
          <ContextMenuItem>
            <ContextMenuContent>
              {auth.user.name.display_name}
            </ContextMenuContent>
          </ContextMenuItem>
          <ContextMenuItem>
            <ContextMenuContent as="button" mode="warning" onClick={signOut}>
              Sign out
            </ContextMenuContent>
          </ContextMenuItem>
        </ContextMenu>
      </StyledPopUpOverlay>
    </Profile>
  );
};
