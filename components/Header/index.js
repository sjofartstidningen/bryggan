// @flow

import React from 'react';
import Link from 'next/link';
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

type Props = {
  activeLink: string,
  user: ?User,
};

const links = [
  { href: '/', title: 'Dashboard' },
  { href: '/tidningen', title: 'Tidningen' },
  { href: '/nyhetsbrevet', title: 'Nyhetsbrevet' },
];

const Header = ({ activeLink, user }: Props) => (
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
        <ProfileImage>{user.img && <img src={user.img} alt="" />}</ProfileImage>
      </ProfileContainer>
    )}
  </HeaderContainer>
);

Header.defaultProps = { user: null };

export default Header;
