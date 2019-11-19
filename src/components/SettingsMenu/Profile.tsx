import React from 'react';
import styled from 'styled-components';
import { ProfileBox } from '../ProfileBox';
import { spacing, size, color, maxWidth } from '../../styles/theme';
import { truncate } from '../../styles/utils';
import { useAuth } from '../../hooks/use-auth';
import { darken } from 'polished';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { profile } from './__generated__/profile';

const PROFILE_QUERY = gql`
  query profile {
    getCurrentAccount {
      email
      name {
        displayName
      }
    }
  }
`;

interface ProfileProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Profile = ({ onClick }: ProfileProps) => {
  const [state, auth] = useAuth();
  const { data } = useQuery<profile>(PROFILE_QUERY);

  if (!state.matches('authenticated')) return null;
  if (!data) return null;

  return (
    <>
      <Wrapper>
        <StyledProfileBox onClick={onClick} background="shade" />
        <ProfileInfo>
          <p title={data.getCurrentAccount.name.displayName}>
            {data.getCurrentAccount.name.displayName}
          </p>
          <p title={data.getCurrentAccount.email}>
            {data.getCurrentAccount.email}
          </p>
        </ProfileInfo>
      </Wrapper>
      <SignOutButtonWrapper>
        <SignOutButton type="button" onClick={() => auth.signOut()}>
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
