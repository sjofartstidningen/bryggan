import _schema from '../../schema.json';
import { IntrospectionQuery } from 'graphql';
import { setBaseGraphqlMocks } from '@iam4x/cypress-graphql-mock';

setBaseGraphqlMocks({
  FullAccount: () => ({
    __typename: 'FullAccount',
    accountId: 'user-id',
    name: () => ({
      givenName: 'Jane',
      surname: 'Doe',
      familiarName: 'Jane',
      displayName: 'Jane Doe',
      abbreviatedName: 'JD',
    }),
    email: 'jane.doe@company.com',
    emailVerified: true,
    locale: 'en-US',
    referralLink: '',
    isPaired: false,
    accountType: 'basic',
    profilePhotoUrl: 'https://via.placeholder.com/150',
    team: null,
    teamMemberId: null,
  }),
  Thumbnail: (_: any, args: any = {}) => {
    return {
      url: `https://via.placeholder.com/${(args?.options?.size ?? 'w128h128')
        .replace('w', '')
        .replace('h', 'x')}`,
      ...args?.options,
    };
  },
});

beforeEach(() => {
  cy.clearStorage();
  cy.setAuthorized();
});

beforeEach(() => {
  cy.server();

  const schema: IntrospectionQuery = (_schema as unknown) as any;
  cy.mockGraphql({
    schema,
    endpoint: '/.netlify/functions/graphql',
    operations: {
      UserQuery: {}, // The data fetching is delegated to FullAccount above
    },
  }).as('mockGraphqlOps');
});
