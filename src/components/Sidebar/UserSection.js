// @flow
import React from 'react';
import styled from 'styled-components';
import Gravatar from '../Gravatar';
import { SignOut } from '../Icon';
import { typeMixin } from '../../styles/type';
import { getColor, colorMixin } from '../../styles/color';
import { transitionMixin } from '../../styles/utils';

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0 1rem;

  ${typeMixin('ui')};
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
    border: 1px solid ${getColor('ui05')};
    border-radius: 100%;
  }
`;

const ProfileImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const ProfileGravatar = ProfileImage.withComponent(Gravatar);

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
  background-color: transparent;
  white-space: nowrap;
  cursor: pointer;

  ${typeMixin('caption')};
  ${colorMixin('text03')};
  ${transitionMixin('color')};

  &:hover {
    ${colorMixin('error')};
  }
`;

type Props = {
  email: ?string,
  displayName: ?string,
  photoURL: ?string,
  onSignOut: () => void,
};

function UserSection({ email, photoURL, displayName, onSignOut }: Props) {
  return (
    <ProfileSection>
      <ProfileImageContainer>
        {photoURL ? (
          <ProfileImage src={photoURL} alt="" />
        ) : (
          <ProfileGravatar email={email} alt="" />
        )}
      </ProfileImageContainer>
      <ProfileName>{displayName || email}</ProfileName>
      <SignOutButton onClick={onSignOut}>
        Logga ut <SignOut baseline />
      </SignOutButton>
    </ProfileSection>
  );
}

export default UserSection;
