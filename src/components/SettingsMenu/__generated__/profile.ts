/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: profile
// ====================================================

export interface profile_getCurrentAccount_name {
  __typename: 'Name';
  displayName: string;
}

export interface profile_getCurrentAccount {
  __typename: 'FullAccount';
  email: string;
  name: profile_getCurrentAccount_name;
}

export interface profile {
  getCurrentAccount: profile_getCurrentAccount;
}
