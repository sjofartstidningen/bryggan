import React from 'react';
import { useTransition, animated } from 'react-spring';
import { PopUpOverlay } from '../PopUpOverlay';
import { MenuWrapper, MenuSection } from './Sections';
import { Profile } from './Profile';
import { GeneralSettings } from './GeneralSettings';
import { UserQuery_currentAccount } from '../../types/graphql';

interface Props {
  id: string;
  isOpen: boolean;
  profile?: UserQuery_currentAccount;
  onClose: () => void;
}

export const SettingsMenu: React.FC<Props> = ({
  id,
  isOpen,
  profile,
  onClose,
}) => {
  const menuTransition = useTransition(isOpen, null, {
    from: { transform: 'translate3d(100%, 0, 0)' },
    enter: { transform: 'translate3d(0%, 0, 0)' },
    leave: { transform: 'translate3d(100%, 0, 0)' },
  });

  return (
    <>
      {menuTransition.map(({ item: show, key, props }) => (
        <PopUpOverlay
          key={key}
          onClick={onClose}
          passThroughPointer={!show}
          preventScroll={show}
        >
          <MenuWrapper
            id={id}
            as={animated.div}
            style={props}
            hidden={!show}
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

            {profile && (
              <MenuSection push>
                <Profile onClick={onClose} profile={profile} />
              </MenuSection>
            )}
          </MenuWrapper>
        </PopUpOverlay>
      ))}
    </>
  );
};
