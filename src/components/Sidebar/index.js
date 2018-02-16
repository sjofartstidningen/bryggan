// @flow
import React, { Component } from 'react';
import NavigationSection from './NavigationSection';
import UserSection from './UserSection';
import {
  Wrapper,
  SidebarSection,
  TitleWrapper,
  Logo,
  TitleLink,
} from './components';
import type { LinkItem, User } from '../../types';

type Props = { links: Array<LinkItem>, user: ?User, onSignOut: () => void };
type State = {};

class Sidebar extends Component<Props, State> {
  render() {
    const { user, onSignOut } = this.props;

    return (
      <Wrapper>
        <SidebarSection>
          <TitleWrapper>
            <Logo />
            <TitleLink to="/">Bryggan</TitleLink>
          </TitleWrapper>
        </SidebarSection>

        <SidebarSection>
          <NavigationSection links={this.props.links} />
        </SidebarSection>

        {user && (
          <SidebarSection style={{ marginTop: 'auto' }}>
            <UserSection
              email={user.email}
              photoURL={user.photoURL}
              displayName={user.displayName}
              onSignOut={onSignOut}
            />
          </SidebarSection>
        )}
      </Wrapper>
    );
  }
}

export default Sidebar;
