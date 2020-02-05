import schema from '../../schema.json';

beforeEach(() => {
  cy.clearStorage();
});

beforeEach(() => {
  cy.server();

  // @ts-ignore
  cy.mockGraphql({
    schema,
    endpoint: '/.netlify/functions/graphql',
    operations: {
      ProfilePhotoQuery: {
        currentAccount: {
          profilePhotoUrl: 'https://via.placeholder.com/150',
        },
      },
      SettingsProfileQuery: {
        currentAccount: {
          email: 'adam@fransvilhelm.com',
          name: {
            displayName: 'Adam Bergman',
          },
        },
      },
    },
  }).as('mockGraphqlOps');
});
