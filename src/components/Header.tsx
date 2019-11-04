import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { spacing, font, size, color, tracking } from '../styles/theme';
import { boxShadow } from '../styles/utils';
import { useAuth, AuthStatus } from '../hooks/use-auth';
import { useScreens } from '../hooks/use-theme';
import { useMenuControls } from '../hooks/use-menu';
import { SearchBox } from './SearchBox';
import { ProfileBox } from './ProfileBox';
import { ScreenMinWidth } from './ScreenSize';
import { MENU_PROFILE } from '../constants';

const HeaderContainer = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: ${spacing('16')};
  padding: 0 ${spacing('4')};
  background-color: ${color('shade')};

  ${boxShadow('md')};
`;

const Title = styled.h1`
  margin: ${spacing('0')};
  margin-right: ${spacing('4')};
  padding: ${spacing('0')};
  font-family: ${font('display')};
  font-size: ${size('lg')};
  text-transform: lowercase;
  letter-spacing: ${tracking('widest')};

  a {
    color: ${color('black')};
    text-decoration: none;
  }
`;

const SearchContainer = styled.div`
  display: block;
  flex: 1;
  max-width: calc(${spacing('64')} * 2.5);
  margin-right: ${spacing('4')};
`;

const ProfileContainer = styled.div`
  margin-left: auto;
`;

export const Header: React.FC = () => {
  const auth = useAuth();
  const screens = useScreens();
  const menu = useMenuControls(MENU_PROFILE);

  return (
    <HeaderContainer>
      <Title>
        <Link to="/">Bryggan</Link>
      </Title>

      {auth.status === AuthStatus.authorized && (
        <>
          <ScreenMinWidth width={Number.parseInt(screens.sm, 10)}>
            <SearchContainer>
              <SearchBox />
            </SearchContainer>
          </ScreenMinWidth>

          <ProfileContainer>
            <ProfileBox onClick={menu.toggle} />
          </ProfileContainer>
        </>
      )}
    </HeaderContainer>
  );
};
