/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SettingsProfileQuery
// ====================================================

export interface SettingsProfileQuery_getCurrentAccount_name {
  __typename: 'Name';
  displayName: string;
}

export interface SettingsProfileQuery_getCurrentAccount {
  __typename: 'FullAccount';
  email: string;
  name: SettingsProfileQuery_getCurrentAccount_name;
}

export interface SettingsProfileQuery {
  getCurrentAccount: SettingsProfileQuery_getCurrentAccount;
}
