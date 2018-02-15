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
import type { LinkItem } from '../../types';

type Props = { links: Array<LinkItem> };
type State = {};

class Sidebar extends Component<Props, State> {
  handleSignOut = () => {};

  render() {
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

        <SidebarSection style={{ marginTop: 'auto' }}>
          <UserSection
            profileImage="https://placehold.it/32x32"
            name="Adam Bergman"
            onSignOut={this.handleSignOut}
          />
        </SidebarSection>
      </Wrapper>
    );
  }
}

export default Sidebar;
