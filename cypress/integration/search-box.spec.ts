describe('Search Box', () => {
  beforeEach(() => {
    cy.setAuthorized();
  });

  it('should search for content with the search box', () => {
    cy.visit('/');
    cy.search('stena line').within(() => {
      cy.findAllByTestId(/search-result-item/i).should('exist');
      cy.findAllByTestId(/search-result-item/i)
        .first()
        .click();
    });

    cy.location('pathname').should('not.eq', '/');
  });

  it('should be possible to search more content', () => {
    cy.visit('/');
    cy.search('stena line');
    cy.findByText(/load more/i)
      .scrollIntoView()
      .click({ force: true });

    cy.findAllByTestId(/search-result-item/i).should(results => {
      const fixtures: any[] = [];
      Cypress.Promise.all([
        cy
          .fixture('dropbox/files/search_v2.json')
          .then(fx => fixtures.push(fx)),
        cy
          .fixture('dropbox/files/search/continue_v2.json')
          .then(fx => fixtures.push(fx)),
      ]).then(() => {
        const matches = fixtures.map(fix => fix.matches);
        expect(results).to.have.length(matches.length);
      });
    });
  });

  it('should remove search result on blur', () => {
    cy.visit('/');
    cy.search('stena line').should('be.visible');
    cy.findByLabelText(/search/i).blur();
    cy.queryByTestId(/^search-result$/i).then(el => Cypress.dom.isHidden(el));
  });
});
