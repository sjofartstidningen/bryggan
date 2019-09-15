import React from 'react';
import styled from 'styled-components';
import { spacing, font, size, color, tracking, useScreens } from 'styles/theme';
import { SearchBox } from './SearchBox';
import { ProfileBox } from './ProfileBox';
import { ScreenMinWidth } from './ScreenSize';
import { Link } from '@reach/router';
import { useAuth, AuthStage } from 'hooks/useAuth';

const HeaderContainer = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: ${spacing('16')};
  padding: 0 ${spacing('4')};
  background-color: ${color('shade')};
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
  const screenSm = useScreens('sm');

  return (
    <HeaderContainer>
      <Title>
        <Link to="/">Bryggan</Link>
      </Title>

      {auth.stage === AuthStage.authorized && (
        <>
          <ScreenMinWidth width={Number.parseInt(screenSm, 10)}>
            <SearchContainer>
              <SearchBox />
            </SearchContainer>
          </ScreenMinWidth>

          <ProfileContainer>
            <ProfileBox />
          </ProfileContainer>
        </>
      )}
    </HeaderContainer>
  );
};
