/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header as Wrapper } from '../MainGrid';
import { SignOut } from '../Icon';
import {
  Logo,
  SiteTitle,
  NavList,
  NavItem,
  NavItemLink,
  ProfileSection,
  ProfileImageContainer,
  ProfileImage,
  ProfileName,
  ProfileSignOut,
  ProfileSignOutLink,
} from './components';

class Header extends Component {
  static propTypes = {
    user: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string.isRequired,
    }),
    onSignOut: PropTypes.func,
  };

  static defaultProps = {
    user: null,
    onSignOut: null,
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
            <ProfileName>{user.displayName || user.email}</ProfileName>
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
