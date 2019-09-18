import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { borderRadius, darken } from 'polished';
import { useMenu } from '../hooks/use-menu';
import {
  AuthStatus,
  useAuthEffect,
  useAuth,
  useAuthSignOut,
} from '../hooks/use-auth';
import { maxWidth, color, spacing, size } from '../styles/theme';
import { boxShadow, truncate, transition } from '../styles/utils';
import * as clipboard from '../utils/clipboard';
import { MENU_PROFILE } from '../constants';
import { ProfileBox } from './ProfileBox';
import { PopUpOverlay } from './PopUpOverlay';
import { Clipboard } from './Icons';
import { VisuallyHidden } from './VisuallyHidden';

const FlyInMenuWrapper = styled(animated.div)`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-flow: column nowrap;
  width: 100vw;
  max-width: ${maxWidth('xs')};
  height: 100vh;
  background: ${color('white')};
  overflow: hidden;

  ${boxShadow('md')};
`;

const Section = styled.div<{ last?: boolean }>`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${color('shade')};
  padding: ${spacing('8')} ${spacing('4')};

  ${({ last }) =>
    last &&
    css`
      border-top: 1px solid ${color('shade')};
      border-bottom: none;
      margin-top: auto;
    `}
`;

const StyledProfileBox = styled(ProfileBox)`
  flex: none;
  margin-right: ${spacing('4')};
`;

const ProfileInfo = styled.div`
  font-size: ${size('sm')};
  color: ${color('black')};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-width: 0;

  & > * {
    margin: 0;
  }

  > *:first-child {
    font-weight: 700;
    ${truncate};
  }

  > *:last-child {
    opacity: 0.8;
    ${truncate};
  }
`;

const MenuButton = styled.button`
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid ${color('shade')};
  border-radius: 4px;
  padding: ${spacing('4')} ${spacing('4')};
  text-align: center;
  font-size: ${size('sm')};
  color: ${color('black')};
  background: ${color('shade')};
  cursor: pointer;

  ${transition('color', 'background')}

  :hover {
    color: ${color('white')};
    background: ${color('highlight')};
  }
`;

const ShareInputContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ShareTokenInput = styled.input`
  display: block;
  width: 100%;
  border: none;
  padding: ${spacing('4')} ${spacing('4')};
  text-align: center;
  font-size: ${size('sm')};
  color: ${color('black')};
  background: ${color('shade')};
  ${borderRadius('left', '4px')};
`;

const ShareTokenButton = styled.button`
  flex: 0 1 auto;
  display: block;
  border: none;
  border-left: 1px solid ${p => darken(0.1, color('shade')(p))};
  padding: ${spacing('4')} ${spacing('4')};
  text-align: center;
  font-size: ${size('sm')};
  color: ${color('black')};
  background: ${color('shade')};
  ${borderRadius('right', '4px')};

  :hover {
    background: ${color('highlight')};
  }
`;

export const ProfileMenu: React.FC = () => {
  const auth = useAuth();
  const signOut = useAuthSignOut();
  const menu = useMenu(MENU_PROFILE, false);
  const [shareToken, setShareToken] = useState(false);
  const tokenInputRef = useRef<HTMLInputElement>(null);

  const menuTransition = useTransition(menu.show, null, {
    from: { transform: 'translate3d(100%, 0, 0)' },
    enter: { transform: 'translate3d(0%, 0, 0)' },
    leave: { transform: 'translate3d(100%, 0, 0)' },
  });

  const tokenTransition = useTransition(shareToken, null, {
    from: { position: 'absolute', width: 288, opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useAuthEffect(({ status }) => {
    if (status === AuthStatus.authorized) menu.register();
    else menu.unregister();
  });

  useEffect(() => {
    if (!menu.show) setShareToken(false);
  }, [menu.show]);

  if (auth.status !== AuthStatus.authorized) return null;

  return (
    <>
      {menuTransition.map(
        ({ item, key, props }) =>
          item && (
            <PopUpOverlay key={key} onClick={menu.close}>
              <FlyInMenuWrapper
                style={props}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Section>
                  <StyledProfileBox onClick={menu.close} background="shade" />
                  <ProfileInfo>
                    <p title={auth.user.name.display_name}>
                      {auth.user.name.display_name}
                    </p>
                    <p title={auth.user.email}>{auth.user.email}</p>
                  </ProfileInfo>
                </Section>

                <Section>
                  <div style={{ width: '100%', height: 49 }}>
                    {tokenTransition.map(({ item, key, props }) =>
                      !item ? (
                        <MenuButton
                          key={key}
                          as={animated.button}
                          type="button"
                          style={props}
                          onClick={() => setShareToken(true)}
                        >
                          Share auth token
                        </MenuButton>
                      ) : (
                        <ShareInputContainer
                          as={animated.div}
                          key={key}
                          style={props}
                        >
                          <ShareTokenInput
                            ref={tokenInputRef}
                            type="text"
                            readOnly
                            value={auth.accessToken}
                          />
                          <ShareTokenButton
                            type="button"
                            onClick={() => {
                              clipboard.write(auth.accessToken, tokenInputRef);
                            }}
                          >
                            <Clipboard />
                            <VisuallyHidden>Copy</VisuallyHidden>
                          </ShareTokenButton>
                        </ShareInputContainer>
                      ),
                    )}
                  </div>
                </Section>

                <Section last>
                  <MenuButton type="button" onClick={signOut}>
                    Sign out
                  </MenuButton>
                </Section>
              </FlyInMenuWrapper>
            </PopUpOverlay>
          ),
      )}
    </>
  );
};
