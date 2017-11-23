import React from 'react';
import IsHovering from '../../components/IsHovering';
import {
  ProfileContainer,
  ProfileImage,
  ProfileName,
  ProfileMenu,
  ProfileMenuItem,
  ProfileMenuLink,
  ProfileMenuInfo,
} from './components';
import Settings from '../../components/Icons/Settings';
import LogOut from '../../components/Icons/LogOut';
import config from '../../config';

function Profile({ user }) {
  return (
    <ProfileContainer>
      <IsHovering style={{ marginLeft: 'auto' }}>
        {({ hovering }) => (
          <div>
            <ProfileName>{user.name}</ProfileName>

            <ProfileImage>
              {user.img && <img src={user.img} alt="" />}
            </ProfileImage>

            <ProfileMenu hover={hovering}>
              <ProfileMenuItem>
                <ProfileMenuLink href="#">
                  <Settings baseline /> Inställningar
                </ProfileMenuLink>
              </ProfileMenuItem>

              <ProfileMenuItem>
                <ProfileMenuLink href="/auth/sign-out" warning>
                  <LogOut baseline /> Logga ut
                </ProfileMenuLink>
              </ProfileMenuItem>

              <ProfileMenuItem>
                <ProfileMenuInfo
                  href={config.repoUrl}
                  rel="noopener"
                  target="_blank"
                >
                  {config.name} v{config.version}
                </ProfileMenuInfo>
              </ProfileMenuItem>
            </ProfileMenu>
          </div>
        )}
      </IsHovering>
    </ProfileContainer>
  );
}

export { Profile as default };
