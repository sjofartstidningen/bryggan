// @flow
import React, { Component } from 'react';
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
} from './components';

const links = [
  { href: '/', title: 'Dashboard' },
  { href: '/tidningen', title: 'Tidningen' },
  { href: '/nyhetsbrevet', title: 'Nyhetsbrevet' },
];

type Props = { user: ?User };
type State = { activeLink: ?string };

class Header extends Component<Props, State> {
  static defaultProps = { user: null };

  state = { activeLink: null };

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
          <ProfileContainer>
            <ProfileName>{user.name}</ProfileName>
            <ProfileImage>
              {user.img && <img src={user.img} alt="" />}
            </ProfileImage>
          </ProfileContainer>
        )}
      </HeaderContainer>
    );
  }
}

export default Header;
