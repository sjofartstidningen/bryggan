import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { modularScale, stripUnit, lighten } from 'polished';
import Logotype from '../Logotype';
import { SignOut } from '../Icon';

const modularScaleRem = x => `${stripUnit(modularScale(x))}rem`;

const Wrapper = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: auto;
  padding: ${modularScale(-1)};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  color: #1a1a1a;
  background-color: ${lighten(0.15, '#c5c5c5')};
  box-shadow: 0px 0px 5px 0px ${lighten(0, '#c5c5c5')};

  & > * {
    margin-right: ${modularScaleRem(2)};
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const Logo = styled(Logotype)`
  width: auto;
  height: ${modularScale(3)};
  margin-right: ${modularScaleRem(0)};
`;

const SiteTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  font-size: ${modularScale(1)};
  font-weight: 700;
  letter-spacing: 0.05em;
`;

const NavList = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NavItem = styled.li`
  margin-right: ${modularScale(0)};

  &:last-child {
    margin-right: 0;
  }
`;

const NavLink = styled.a`
  color: ${lighten(0.5, '#1a1a1a')};
  text-decoration: none;
  transition: color 0.1s ease-in-out;

  ${p =>
    p.active &&
    css`
      color: #1a1a1a;
    `};

  &:hover {
    color: #1a1a1a;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  & > * {
    margin-right: ${modularScaleRem(-1)};
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const ProfileImage = styled.img`
  width: ${modularScale(2)};
  height: ${modularScale(2)};
  border-radius: 100%;
`;

const ProfileName = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 500;
`;

const ProfileSignOut = ProfileName.extend`
  font-size: ${modularScale(-1)};
  font-weight: 400;
`;

const ProfileSignOutLink = NavLink.extend`
  &:hover {
    color: red;
  }
`;

class Header extends Component {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
  };

  render() {
    const { authorized } = this.props;

    return (
      <Wrapper>
        <Logo />
        <SiteTitle>Bryggan</SiteTitle>

        <nav>
          <NavList>
            <NavItem>
              <NavLink href="/" active>
                Tidningen
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Inställningar</NavLink>
            </NavItem>
          </NavList>
        </nav>

        {authorized && (
          <ProfileSection>
            <ProfileImage
              src="http://via.placeholder.com/28x28?text=AB"
              alt=""
              width="28"
              height="28"
            />
            <ProfileName>Adam Bergman</ProfileName>
            <ProfileSignOut>
              <ProfileSignOutLink href="/">
                Logga ut <SignOut baseline />
              </ProfileSignOutLink>
            </ProfileSignOut>
          </ProfileSection>
        )}
      </Wrapper>
    );
  }
}

export default Header;
