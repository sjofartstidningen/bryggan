// @flow
import React from 'react';
import styled from 'styled-components';
import { SignOut } from '../Icon';
import { getColor, getTypeScale, transition } from '../../styles';

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0 1rem;

  ${getTypeScale(1)};
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    border: 1px solid ${getColor('emphasis border')};
    border-radius: 100%;
  }
`;

const ProfileImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const ProfileName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SignOutButton = styled.button`
  margin: 0;
  margin-left: auto;
  border: none;
  padding: 0;
  ${getTypeScale(0)};
  color: ${getColor('hint text')};
  background-color: transparent;
  white-space: nowrap;
  cursor: pointer;
  ${transition('color')};

  &:hover {
    color: ${getColor('error')};
  }
`;

type Props = {
  profileImage: string,
  name: string,
  onSignOut: () => void,
};

function UserSection({ profileImage, name, onSignOut }: Props) {
  return (
    <ProfileSection>
      <ProfileImageContainer>
        <ProfileImage src={profileImage} alt="" />
      </ProfileImageContainer>
      <ProfileName>{name}</ProfileName>
      <SignOutButton onClick={onSignOut}>
        Logga ut <SignOut baseline />
      </SignOutButton>
    </ProfileSection>
  );
}

export default UserSection;
