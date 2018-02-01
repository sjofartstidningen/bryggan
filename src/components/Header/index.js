/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { modularScale, stripUnit, lighten } from 'polished';
import { NavLink } from 'react-router-dom';
import { Header as Wrapper } from '../MainGrid';
import Logotype from '../Logotype';
import Gravatar from '../Gravatar';
import { SignOut } from '../Icon';

const modularScaleRem = x => `${stripUnit(modularScale(x))}rem`;

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

const NavItemLink = styled(NavLink)`
  color: ${lighten(0.5, '#1a1a1a')};
  text-decoration: none;
  transition: color 0.1s ease-in-out;

  &.active,
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

const ProfileImageContainer = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    height: calc(100% + 6px);
    width: calc(100% + 6px);
    border: 1px solid #1a1a1a;
    border-radius: 100%;
  }
`;

const ProfileImage = styled(Gravatar)`
  display: block;
  width: ${modularScale(2)};
  height: ${modularScale(2)};
  border-radius: 100%;
  background-color: white;
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

const ProfileSignOutLink = styled.button`
  border: none;
  font-size: 1em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  text-decoration: none;
  color: ${lighten(0.5, '#1a1a1a')};
  background-color: transparent;
  transition: color 0.1s ease-in-out;

  &:hover {
    color: red;
  }
`;

class Header extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string.isRequired,
      image: PropTypes.string,
    }),
    onSignOut: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
  };

  handleSignOut = () => this.props.onSignOut();

  render() {
    const { user } = this.props;

    return (
      <Wrapper>
        <Logo />
        <SiteTitle>Bryggan</SiteTitle>

        <nav>
          <NavList>
            <NavItem>
              <NavItemLink to="/tidningen">Tidningen</NavItemLink>
            </NavItem>
            <NavItem>
              <NavItemLink to="/installningar">Inställningar</NavItemLink>
            </NavItem>
          </NavList>
        </nav>

        {user != null && (
          <ProfileSection>
            <ProfileImageContainer>
              <ProfileImage email={user.email} alt="" width="28" height="28" />
            </ProfileImageContainer>
            <ProfileName>{user.name || user.email}</ProfileName>
            <ProfileSignOut>
              <ProfileSignOutLink onClick={this.handleSignOut}>
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
