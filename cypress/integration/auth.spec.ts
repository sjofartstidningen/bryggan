describe('Auth Flow', () => {
  it('should be possible to sign in by pasting access token', () => {
    cy.visit('/');
    cy.signIn();
    cy.location('pathname').should('eq', '/');
  });

  it('should be possible to sign out', () => {
    cy.mockDropbox('auth/token/revoke');
    cy.setAuthorized();
    cy.visit('/');

    cy.findByText(/context menu/i)
      .should('exist')
      .parent()
      .click();

    cy.findByText(/sign out/i)
      .should('exist')
      .click();

    cy.findByText(/sign in with dropbox/i).should('exist');
  });
});
