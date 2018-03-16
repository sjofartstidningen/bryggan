// @flow
import React, { Component } from 'react';
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

interface User {
  email: string;
  displayName?: string;
  photoURL?: string;
}

type NavLinkItem = {
  to: string,
  title: string,
};

type Props = {
  links: Array<NavLinkItem>,
  user: User,
  onSignOut: (user: User) => void,
};

type State = {};

class Sidebar extends Component<Props, State> {
  state = {};

  render() {
    const { links, user, onSignOut } = this.props;

    const photoUrl =
      user.photoURL ||
      `https://www.gravatar.com/avatar/${md5(user.email)}?d=404`;

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

        <ProfileContainer>
          <ProfileImageContainer>
            <ProfileImage
              src={photoUrl}
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
      </Wrapper>
    );
  }
}

export { Sidebar as default };
