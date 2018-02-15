// @flow
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import type { ContextRouter } from 'react-router-dom';
import NavigationSection from './NavigationSection';
import UserSection from './UserSection';
import {
  Wrapper,
  SidebarSection,
  TitleWrapper,
  Logo,
  TitleLink,
} from './components';
import { Book, Sliders } from '../Icon';

type Props = ContextRouter & {};
type State = {};

class Sidebar extends PureComponent<Props, State> {
  handleSignOut = () => {};

  links = [
    {
      to: '/tidningen',
      title: 'Tidningen',
      icon: Book,
      links: [
        { to: '/tidningen/2017', title: '2017' },
        { to: '/tidningen/2016', title: '2016' },
        { to: '/tidningen/2015', title: '2015' },
      ],
    },
    { to: '/installningar', title: 'Inställningar', icon: Sliders },
  ];

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
          <NavigationSection links={this.links} />
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

export default withRouter(Sidebar);
