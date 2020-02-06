/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="cypress" />
import * as jQuery from 'jquery';
import * as localforage from 'localforage';

interface LocalForageHandler<T> {
  (localforage: LocalForage): Promise<T>;
}

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Set the curret session as signed in by populating the local storage
       * with correct data.
       *
       * @example
       * cy.setAuthorized();
       *
       * @returns {Chainable<void>}
       * @memberof Chainable
       */
      setAuthorized(): Chainable<void>;

      /**
       * Set the curret session as signed out
       *
       * @example
       * cy.setUnauthorized();
       *
       * @returns {Chainable<void>}
       * @memberof Chainable
       */
      setUnauthorized(): Chainable<void>;

      /**
       * Use localforage and perform actions with it.
       *
       * @example
       * cy.localforage(localforage => localforage.clear());
       * cy.localforage(localforage => localforage.getItem<string>('key'));
       *
       * @template T
       * @param {LocalForageHandler<T>} handler
       * @returns {Chainable<T>}
       * @memberof Chainable
       */
      localforage<T = any>(handler: LocalForageHandler<T>): Chainable<T>;

      /**
       * Clear all storage using localforage.
       *
       * @example
       * cy.clearStorage();
       *
       * @returns {Chainable<Promise<void>>}
       * @memberof Chainable
       */
      clearStorage(): Chainable<Promise<void>>;

      /**
       * Perform a search and get the search result container back.
       *
       * @param {string} query
       * @returns {Chainable<JQuery<HTMLElement>>}
       * @memberof Chainable
       */
      search(query: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Mock a Dropbox endpoint with responses from the fixtures folder.
       * Fixtures should be placed in subfolders matching the url schema, e.g:
       * https://api.dropboxapi.com/2/files/search -> {fixtures}/dropbox/files/search.json
       *
       * @param {string} endpoint
       * @return {Chainable<null>}
       * @memberof Chainable
       */
      mockDropbox(endpoint: string): Chainable<null>;
    }
  }
}
