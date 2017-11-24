import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../../config';
import Logotype from '../../components/Logotype';
import {
  HeaderContainer,
  LogotypeContainer,
  NavContainer,
  Nav,
  NavItem,
  NavLink,
} from './components';
import Profile from '../../components/Profile';

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
      <Profile user={user} />
    </HeaderContainer>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
  }),
};

Header.defaultProps = { user: null };

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Header);
