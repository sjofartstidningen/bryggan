import React from 'react';
import styled from 'styled-components';
import { ProfileBox } from '../ProfileBox';
import { spacing, size, color } from '../../styles/theme';
import { truncate } from '../../styles/utils';
import { useAuth, AuthStatus, useAuthSignOut } from '../../hooks/use-auth';
import { darken } from 'polished';

interface ProfileProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Profile = ({ onClick }: ProfileProps) => {
  const auth = useAuth();
  const signOut = useAuthSignOut();

  if (auth.status !== AuthStatus.authorized) return null;
  console.log(auth.user);
  return (
    <Wrapper>
      <StyledProfileBox onClick={onClick} background="shade" />
      <ProfileInfo>
        <p title={auth.user.name.display_name}>{auth.user.name.display_name}</p>
        <p title={auth.user.email}>{auth.user.email}</p>
      </ProfileInfo>
      <SignOutButton type="button" onClick={signOut}>
        Sign out
      </SignOutButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: ${spacing('4')};
`;

const StyledProfileBox = styled(ProfileBox)`
  flex: none;
  width: ${spacing('12')};
  height: ${spacing('12')};
  margin-bottom: ${spacing('4')};
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-width: 0;
  margin-bottom: ${spacing('2')};
  font-size: ${size('sm')};
  color: ${color('black')};

  & > * {
    margin: 0;
    margin-bottom: ${spacing('1')};
  }

  > *:first-child {
    font-weight: 700;
    ${truncate};
  }

  > *:last-child {
    opacity: 0.8;
    ${truncate};
  }
`;

const SignOutButton = styled.button`
  margin: 0;
  border: none;
  padding: 0;
  color: ${color('warning')};
  font-size: ${size('xs')};
  background: transparent;
  cursor: pointer;

  :hover {
    color: ${p => darken(0.2, color('warning')(p))};
  }
`;
