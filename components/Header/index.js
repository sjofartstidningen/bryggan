import React from 'react';
import PropTypes from 'prop-types';
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

const Header = ({ links, user }) => (
  <HeaderContainer>
    <LogotypeContainer>
      <Logotype />
    </LogotypeContainer>

    <NavContainer className="navigation">
      <Nav>
        {links.map(link => (
          <NavItem key={link.href} active={link.active}>
            {link.title}
          </NavItem>
        ))}
      </Nav>
    </NavContainer>

    <ProfileContainer>
      <ProfileName>{user.name}</ProfileName>
      <ProfileImage>{user.img && <img src={user.img} alt="" />}</ProfileImage>
    </ProfileContainer>
  </HeaderContainer>
);

Header.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      active: PropTypes.bool,
    }),
  ).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
  }).isRequired,
};

export default Header;
