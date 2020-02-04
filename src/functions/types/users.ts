import { gql } from 'apollo-server-lambda';

export const Users = gql`
  type BasicAccount {
    accountId: ID!
    name: Name!
    email: String!
    emailVerified: Boolean!
    disabled: Boolean!
    isTeammate: Boolean!
    profilePhotoUrl: String
    teamMemberId: String
  }

  type FullAccount {
    accountId: ID!
    name: Name!
    email: String!
    emailVerified: Boolean!
    locale: String!
    referralLink: String!
    isPaired: String!
    accountType: AccountType!
    profilePhotoUrl: String
    team: FullTeam
    teamMemberId: String
    # rootInfo: RootInfo!
  }

  type Name {
    givenName: String!
    surname: String!
    familiarName: String!
    displayName: String!
    abbreviatedName: String!
  }

  type FullTeam {
    id: ID!
    name: String!
    # sharingPolicies TeamSharingPolicies!
    # officeAddinPolicy: OfficeAddinPolicy!
  }

  enum AccountType {
    basic
    pro
    business
  }

  extend type Query {
    currentAccount: FullAccount!
    account(id: ID!): BasicAccount
  }
`;
