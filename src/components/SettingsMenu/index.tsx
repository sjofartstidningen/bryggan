import React from 'react';
import { useTransition, animated } from 'react-spring';
import { useMenu } from '../../hooks/use-menu';
import { useAuthEffect, useAuthState } from '../../hooks/use-auth2';
import { MENU_PROFILE } from '../../constants';
import { PopUpOverlay } from '../PopUpOverlay';
import { MenuWrapper, MenuSection } from './Sections';
import { Profile } from './Profile';
import { GeneralSettings } from './GeneralSettings';

export const SettingsMenu: React.FC = () => {
  const state = useAuthState();
  const menu = useMenu(MENU_PROFILE, false);

  const menuTransition = useTransition(menu.show, null, {
    from: { transform: 'translate3d(100%, 0, 0)' },
    enter: { transform: 'translate3d(0%, 0, 0)' },
    leave: { transform: 'translate3d(100%, 0, 0)' },
  });

  useAuthEffect(state => {
    if (state.matches('authenticated')) {
      menu.register();
    } else {
      menu.unregister();
    }
  });

  if (!state.matches('authenticated')) return null;

  return (
    <>
      {menuTransition.map(
        ({ item, key, props }) =>
          item && (
            <PopUpOverlay key={key} onClick={menu.close}>
              <MenuWrapper
                as={animated.div}
                style={props}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  /**
                   * Propagation needs to be stopped here since otherwise the
                   * event will bubble up to the `<PopupOverlay />` and
                   * therefore closing the menu, which is not desireable.
                   */
                  e.stopPropagation();
                }}
              >
                <MenuSection>
                  <GeneralSettings />
                </MenuSection>
                <MenuSection push>
                  <Profile onClick={menu.close} />
                </MenuSection>
              </MenuWrapper>
            </PopUpOverlay>
          ),
      )}
    </>
  );
};
