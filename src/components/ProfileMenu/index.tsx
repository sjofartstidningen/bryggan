import React from 'react';
import { useTransition, animated } from 'react-spring';
import { useMenu } from '../../hooks/use-menu';
import { AuthStatus, useAuthEffect, useAuth } from '../../hooks/use-auth';
import { MENU_PROFILE } from '../../constants';
import { PopUpOverlay } from '../PopUpOverlay';
import { ProfileMenuWrapper, MenuSection } from './Sections';
import { Profile } from './Profile';

export const ProfileMenu: React.FC = () => {
  const auth = useAuth();
  const menu = useMenu(MENU_PROFILE, false);

  const menuTransition = useTransition(menu.show, null, {
    from: { transform: 'translate3d(100%, 0, 0)' },
    enter: { transform: 'translate3d(0%, 0, 0)' },
    leave: { transform: 'translate3d(100%, 0, 0)' },
  });

  useAuthEffect(({ status }) => {
    if (status === AuthStatus.authorized) {
      menu.register();
    } else {
      menu.unregister();
    }
  });

  if (auth.status !== AuthStatus.authorized) return null;

  return (
    <>
      {menuTransition.map(
        ({ item, key, props }) =>
          item && (
            <PopUpOverlay key={key} onClick={menu.close}>
              <ProfileMenuWrapper
                as={animated.div}
                style={props}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <MenuSection>
                  <Profile onClick={menu.close} />
                </MenuSection>
              </ProfileMenuWrapper>
            </PopUpOverlay>
          ),
      )}
    </>
  );
};
