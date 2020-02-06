describe('Auth Flow', () => {
  it('should be possible to sign in by pasting access token', () => {
    cy.setUnauthorized();
    cy.visit('/');

    cy.findByText(/paste/i).click();
    cy.findByLabelText(/access token/i).focus();
    cy.findByLabelText(/access token/i).type(
      Cypress.env('DROPBOX_ACCESS_TOKEN'),
    );

    cy.get('form').submit();

    cy.location('pathname').should('eq', '/');
  });

  it('should be possible to sign out', () => {
    cy.setAuthorized();
    cy.visit('/');

    cy.findByLabelText(/context menu/i)
      .should('exist')
      .click();

    cy.findByText(/sign out/i)
      .should('exist')
      .click();

    cy.findByText(/sign in with dropbox/i).should('exist');
  });
});
