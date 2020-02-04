import '@testing-library/cypress/add-commands';
import '@iam4x/cypress-graphql-mock';

import localforage from 'localforage';
import { PersistedAuthSet } from '../../src/types/bryggan';
import { LOCALSTORAGE_AUTH_KEY, USER_CHECK_QUERY } from '../../src/constants';

Cypress.Commands.add('setAuthorized', () => {
  cy.log('Set session as authorized');

  cy.mockDropbox('auth/token/revoke');
  cy.mockDropbox('check/user');

  cy.localforage(localforage =>
    localforage.setItem<PersistedAuthSet>(LOCALSTORAGE_AUTH_KEY, {
      accessToken: Cypress.env('DROPBOX_ACCESS_TOKEN'),
    }),
  );
});

Cypress.Commands.add('localforage', handler => handler(localforage));

Cypress.Commands.add('clearStorage', () => {
  cy.log('Clear storage');
  cy.localforage(l => l.clear());
});

Cypress.Commands.add('search', (query: string) => {
  cy.mockDropbox('files/search/continue_v2');
  cy.mockDropbox('files/search_v2');

  cy.findByLabelText(/search/i)
    .focus()
    .type(query);

  return cy.findByTestId(/^search-result$/i);
});

Cypress.Commands.add('mockDropbox', (endpoint: string) => {
  const url = 'https://api.dropboxapi.com/2/' + endpoint.replace(/^\//, '');
  const fixture = 'dropbox/' + endpoint.replace(/^\//, '') + '.json';

  cy.server();

  if (endpoint === 'check/user') {
    return cy.route({
      method: 'POST',
      url,
      response: { result: USER_CHECK_QUERY },
    });
  }

  return cy.fixture(fixture).then(response => {
    return cy.route({ method: 'POST', url, response });
  });
});
