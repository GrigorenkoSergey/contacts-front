describe('snapshots', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
    cy.get('[data-cy="contact-list"]').should('not.contain', 'Нет контактов');
  });

  it('macbook-11', () => {
    cy.viewport('macbook-11');
    cy.matchImageSnapshot('macbook-11');
  });

  it('ipad-2', () => {
    cy.viewport('ipad-2');
    cy.matchImageSnapshot('ipad-2');
  });

  it('samsung-note9', () => {
    cy.viewport('samsung-note9');
    cy.matchImageSnapshot('samsung-note9');
  });

  it('iphone-4', () => {
    cy.viewport('iphone-4');
    cy.matchImageSnapshot('iphone-4');
  });
});

export {};
