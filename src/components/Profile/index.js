import React from 'react';
import PropTypes from 'prop-types';
import IsHovering from '../IsHovering';
import Settings from '../Icons/Settings';
import LogOut from '../Icons/LogOut';
import ProfilePicture from './ProfilePicture';
import {
  ProfileContainer,
  ProfileName,
  ProfileMenu,
  ProfileMenuItem,
  ProfileMenuLink,
  ProfileMenuInfo,
  NavLink,
} from './components';
import config from '../../config';

function Profile({ user }) {
  if (user == null)
    return (
      <ProfileContainer>
        <NavLink to="/auth/sign-in">Logga in</NavLink>
      </ProfileContainer>
    );

  return (
    <IsHovering style={{ marginLeft: 'auto' }}>
      {({ hovering }) => (
        <ProfileContainer>
          <ProfileName>{user.displayName || user.email}</ProfileName>

          <ProfilePicture src={user.photoURL} email={user.email} />

          <ProfileMenu hover={hovering}>
            <ProfileMenuItem>
              <ProfileMenuLink to="/">
                <Settings baseline /> Inställningar
              </ProfileMenuLink>
            </ProfileMenuItem>

            <ProfileMenuItem>
              <ProfileMenuLink to="/auth/sign-out" warning>
                <LogOut baseline /> Logga ut
              </ProfileMenuLink>
            </ProfileMenuItem>

            <ProfileMenuItem>
              <ProfileMenuInfo
                to={config.repoUrl}
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
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
  }),
};

Profile.defaultProps = {
  user: null,
};

export { Profile as default };
