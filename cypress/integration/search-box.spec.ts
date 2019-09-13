describe('Search Box', () => {
  beforeEach(() => {
    cy.setAuthorized();
  });

  it('should be hidden on smaller screens', () => {
    cy.visit('/');
    cy.viewport('iphone-6');
    cy.queryByLabelText(/search/).should('not.exist');
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

    // 20 is the total length of the responses from /search and /search/continue
    cy.findAllByTestId(/search-result-item/i).should('have.length', 20);
  });

  it('should remove search result on blur', () => {
    cy.visit('/');
    cy.search('stena line').should('be.visible');
    cy.findByLabelText(/search/i).blur();
    cy.queryByTestId(/^search-result$/i).then(el => Cypress.dom.isHidden(el));
  });
});
