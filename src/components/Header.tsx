import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { spacing, font, size, color, tracking, layer } from '../styles/theme';
import { boxShadow } from '../styles/utils';
import { useAuthState } from '../hooks/use-auth';
import { useScreens } from '../hooks/use-theme';
import { SearchBox } from './SearchBox';
import { ProfileBox } from './ProfileBox';
import { ScreenMinWidth } from './ScreenSize';
import { SettingsMenu } from './SettingsMenu';
import { UserQuery } from '../types/graphql';

export const USER_QUERY = gql`
  query UserQuery {
    currentAccount {
      email
      name {
        displayName
      }
      profilePhotoUrl
    }
  }
`;

export const Header: React.FC = () => {
  const state = useAuthState();
  const screens = useScreens();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [fetchUser, { data, called }] = useLazyQuery<UserQuery>(USER_QUERY);

  useEffect(() => {
    if (state.matches('authenticated') && !called) fetchUser();
  }, [state, called, fetchUser]);

  return (
    <HeaderContainer>
      <Title>
        <Link to="/">Bryggan</Link>
      </Title>

      {state.matches('authenticated') && (
        <>
          <ScreenMinWidth width={Number.parseInt(screens.sm, 10)}>
            <SearchContainer>
              <SearchBox />
            </SearchContainer>
          </ScreenMinWidth>

          {data && (
            <React.Fragment>
              <ProfileContainer>
                <ProfileBox
                  label="Toggle context menu"
                  profilePhotoUrl={data.currentAccount.profilePhotoUrl}
                  onClick={() => setMenuIsOpen(!menuIsOpen)}
                  aria-controls="context-menu"
                  aria-expanded={menuIsOpen}
                />
              </ProfileContainer>

              <SettingsMenu
                id="context-menu"
                isOpen={menuIsOpen}
                profile={data.currentAccount}
                onClose={() => setMenuIsOpen(false)}
              />
            </React.Fragment>
          )}
        </>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: ${spacing('16')};
  padding: 0 ${spacing('4')};
  background-color: ${color('shade')};
  z-index: ${layer('header')};

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
