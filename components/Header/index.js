import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import raf from 'raf-schd';
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
} from './components';
import IsHovering from '../IsHovering';
import Settings from '../Icons/Settings';
import LogOut from '../Icons/LogOut';

const links = [
  { href: '/', title: 'Dashboard' },
  { href: '/tidningen', title: 'Tidningen' },
  { href: '/nyhetsbrevet', title: 'Nyhetsbrevet' },
];

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
    const currentPage = links.find(link => {
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
            {links.map(link => (
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
                    <ProfileMenuLink href="/auth/sign-out">
                      <LogOut baseline /> Logga ut
                    </ProfileMenuLink>
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
