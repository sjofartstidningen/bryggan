import React from 'react';
import PropTypes from 'prop-types';
import config from '../../config';
import Logotype from '../../components/Logotype';
import {
  HeaderContainer,
  LogotypeContainer,
  NavContainer,
  Nav,
  NavItem,
  NavLink,
  ProfileContainer,
  ProfileName,
  ProfileImage,
  ProfileMenu,
  ProfileMenuItem,
  ProfileMenuLink,
  ProfileMenuInfo,
} from './components';
import IsHovering from '../../components/IsHovering';
import Settings from '../../components/Icons/Settings';
import LogOut from '../../components/Icons/LogOut';

function Header({ user }) {
  return (
    <HeaderContainer>
      <LogotypeContainer to="/">
        <Logotype />
      </LogotypeContainer>

      <NavContainer>
        <Nav>
          {config.mainLinks.map(link => (
            <NavItem key={link.href}>
              <NavLink to={link.href} activeClassName="active">
                {link.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </NavContainer>

      {user ? (
        <IsHovering style={{ marginLeft: 'auto' }}>
          {({ hovering }) => (
            <ProfileContainer>
              <ProfileName>{user.name}</ProfileName>

              <ProfileImage>
                {user.img && <img src={user.img} alt="" />}
              </ProfileImage>

              <ProfileMenu hover={hovering}>
                <ProfileMenuItem>
                  <ProfileMenuLink href="#">
                    <Settings baseline /> Inställningar
                  </ProfileMenuLink>
                </ProfileMenuItem>

                <ProfileMenuItem>
                  <ProfileMenuLink href="/auth/sign-out" warning>
                    <LogOut baseline /> Logga ut
                  </ProfileMenuLink>
                </ProfileMenuItem>

                <ProfileMenuItem>
                  <ProfileMenuInfo
                    href={config.repoUrl}
                    rel="noopener"
                    target="_blank"
                  >
                    {config.name} v{config.version}
                  </ProfileMenuInfo>
                </ProfileMenuItem>
              </ProfileMenu>
            </ProfileContainer>
          )}
        </IsHovering>
      ) : (
        <ProfileContainer>
          <NavLink to="/auth/sign-in" activeClassName="active">
            Logga in
          </NavLink>
        </ProfileContainer>
      )}
    </HeaderContainer>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
  }),
};

Header.defaultProps = { user: null };

export default Header;
