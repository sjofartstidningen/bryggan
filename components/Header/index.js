// @flow

import React from 'react';
import Logotype from '../Logotype';
import {
  HeaderContainer,
  LogotypeContainer,
  NavContainer,
  Nav,
  NavItem,
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
  { href: '/nyhetsbrev', title: 'Nyhetsbrevet' },
];

const Header = ({ activeLink, user }: Props) => (
  <HeaderContainer>
    <LogotypeContainer>
      <Logotype />
    </LogotypeContainer>

    <NavContainer>
      <Nav>
        {links.map(link => (
          <NavItem key={link.href} active={link.href === activeLink}>
            {link.title}
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
