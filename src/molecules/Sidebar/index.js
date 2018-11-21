import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'md5';
import { Logotype } from '../../atoms/Icon';
import {
  Wrapper,
  IconContainer,
  NavContainer,
  NavList,
  NavListItem,
  NavLink,
  ProfileContainer,
  ProfileImageContainer,
  ProfileImage,
  ProfileImageFallback,
  ProfileDataContainer,
  ProfileDataName,
  ProfileSignOutButton,
} from './components';

class Sidebar extends Component<Props, State> {
  static propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        render: PropTypes.func.isRequired,
      }),
    ).isRequired,
    user: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      email: PropTypes.string,
      displayName: PropTypes.string,
      photoURL: PropTypes.string,
      emailVerified: PropTypes.bool.isRequired,
      updateProfile: PropTypes.func.isRequired,
      sendEmailVerification: PropTypes.func.isRequired,
    }),
    onSignOut: PropTypes.func.isRequired,
  };

  state = {};

  render() {
    const { links, user, onSignOut } = this.props;

    return (
      <Wrapper>
        <IconContainer>
          <Logotype baseline={false} />
        </IconContainer>

        <NavContainer>
          <NavList>
            {links.map(link => (
              <NavListItem key={link.to} items={links.length}>
                <NavLink to={link.to}>{link.title}</NavLink>
              </NavListItem>
            ))}
          </NavList>
        </NavContainer>

        {user && (
          <ProfileContainer>
            <ProfileImageContainer>
              <ProfileImage
                src={
                  user.photoURL ||
                  `https://www.gravatar.com/avatar/${md5(user.email)}?d=404`
                }
                width="2rem"
                height="2rem"
                renderPlaceholder={() => <ProfileImageFallback />}
                renderLoading={() => <ProfileImageFallback />}
                renderError={() => <ProfileImageFallback />}
              />
            </ProfileImageContainer>

            <ProfileDataContainer>
              <ProfileDataName title={user.email}>
                {user.displayName || user.email}
              </ProfileDataName>
              <ProfileSignOutButton onClick={() => onSignOut(user)}>
                Logga ut
              </ProfileSignOutButton>
            </ProfileDataContainer>
          </ProfileContainer>
        )}
      </Wrapper>
    );
  }
}

export { Sidebar as default };
