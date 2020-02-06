import '@testing-library/cypress/add-commands';
import '@iam4x/cypress-graphql-mock';

import localforage from 'localforage';
import { PersistedAuthSet } from '../../src/types/bryggan';
import { LOCALSTORAGE_AUTH_KEY, USER_CHECK_QUERY } from '../../src/constants';

Cypress.Commands.add('setUnauthorized', () => {
  cy.localforage(localforage => {
    return localforage.removeItem(LOCALSTORAGE_AUTH_KEY);
  });
});

Cypress.Commands.add('setAuthorized', () => {
  cy.log('Set session as authorized');

  cy.server();
  cy.route({
    url: 'https://api.dropboxapi.com/2/check/user',
    method: 'POST',
    response: { result: USER_CHECK_QUERY },
  }).as('check/user');

  cy.route({
    url: 'https://api.dropboxapi.com/2/auth/token/revoke',
    method: 'POST',
    response: {},
  }).as('token/revoke');

  cy.localforage(localforage => {
    return localforage.setItem<PersistedAuthSet>(LOCALSTORAGE_AUTH_KEY, {
      accessToken: Cypress.env('DROPBOX_ACCESS_TOKEN'),
    });
  }).as('authorized');
});

Cypress.Commands.add('localforage', handler => handler(localforage));

Cypress.Commands.add('clearStorage', () => {
  cy.log('Clear storage');
  cy.localforage(l => l.clear());
});

Cypress.Commands.add('search', (query: string) => {
  cy.findByLabelText(/search/i)
    .focus()
    .type(query);

  return cy.findByTestId(/^search-result$/i);
});
