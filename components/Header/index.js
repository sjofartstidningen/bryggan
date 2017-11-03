import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import raf from 'raf-schd';
import config from '../../config';
import { version } from '../../package.json';
import Logotype from '../Logotype';
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
import IsHovering from '../IsHovering';
import Settings from '../Icons/Settings';
import LogOut from '../Icons/LogOut';

class Header extends Component {
  state = { activeLink: null };

  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string,
    }),
  };

  static defaultProps = { user: null };

  componentDidMount() {
    this.checkActiveLink();
  }

  checkActiveLink = () => {
    const setActiveLink = raf(activeLink =>
      this.setState(() => ({ activeLink })),
    );

    const { pathname } = Router;
    const currentPage = config.topLinks.find(link => {
      const { href } = link;
      if (href === pathname) return true;
      if (href !== '/' && pathname.includes(href)) return true;
      return false;
    });

    if (currentPage) setActiveLink(currentPage.href);
  };

  render() {
    const { user } = this.props;
    const { activeLink } = this.state;

    return (
      <HeaderContainer>
        <LogotypeContainer>
          <Logotype />
        </LogotypeContainer>

        <NavContainer>
          <Nav>
            {config.topLinks.map(link => (
              <NavItem key={link.href}>
                <NavLink href={link.href} active={link.href === activeLink}>
                  {link.title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </NavContainer>

        {user && (
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
        )}
      </HeaderContainer>
    );
  }
}

export default Header;
