import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { spacing, size, color, maxWidth } from '../../styles/theme';
import { truncate } from '../../styles/utils';
import { useAuthMethods } from '../../hooks/use-auth';
import { UserQuery_currentAccount } from '../../types/graphql';
import { ProfileBox } from '../ProfileBox';

interface ProfileProps {
  profile: UserQuery_currentAccount;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Profile = ({ profile, onClick }: ProfileProps) => {
  const { signOut } = useAuthMethods();

  return (
    <>
      <Wrapper>
        <StyledProfileBox
          profilePhotoUrl={profile.profilePhotoUrl}
          onClick={onClick}
          background="shade"
          label=""
        />
        <ProfileInfo>
          <p title={profile.name.displayName}>{profile.name.displayName}</p>
          <p title={profile.email}>{profile.email}</p>
        </ProfileInfo>
      </Wrapper>
      <SignOutButtonWrapper>
        <SignOutButton type="button" onClick={signOut}>
          Sign out
        </SignOutButton>
      </SignOutButtonWrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  padding: ${spacing('4')};
`;

const StyledProfileBox = styled(ProfileBox)`
  flex: none;
  width: ${spacing('12')};
  height: ${spacing('12')};
  margin-right: ${spacing('4')};
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: calc(${maxWidth('xs')} - (${spacing('12')} + (${spacing('4')} * 3)));
  margin-bottom: ${spacing('1')};
  font-size: ${size('sm')};
  color: ${color('black')};

  > p {
    margin: 0;
    line-height: 1.2;
    ${truncate};
  }

  > p:first-child {
    font-weight: 700;
  }

  > p:last-child {
    opacity: 0.8;
  }
`;

const SignOutButtonWrapper = styled.div`
  width: 100%;
  padding: ${spacing('4')};
  padding-top: 0;
  text-align: right;
`;

const SignOutButton = styled.button`
  display: inline-block;
  margin: 0;
  border: none;
  padding: ${spacing('1')};
  color: ${color('warning')};
  font-size: ${size('xs')};
  background: transparent;
  cursor: pointer;

  :hover {
    color: ${p => darken(0.2, color('warning')(p))};
  }
`;
