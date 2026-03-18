describe('Create Adlib', () => {
  it('should generate on the home page, and then redirects to the adlib play page', () => {

    cy.intercept('POST', /\/api\/trpc\/adlib\.create/).as('createAdlib');
    cy.intercept('GET', /\/api\/trpc\/adlib\.getAdlibByIdPlay/).as('getAdlibPlay');

    cy.visit('/');

    const promptText = "A cat and funny robot take a walk";

    cy.get('[data-cy=prompt-input]').clear().type(promptText);

    cy.get('[data-cy=prompt-submit-btn]').click();

    cy.wait('@createAdlib', { timeout: 20000 }).its('response.statusCode').should('equal', 200);

    cy.wait('@getAdlibPlay').its('response.statusCode').should('equal', 200);


    cy.get('[data-cy=adlib-play-description]', { timeout: 20_000 })
      .invoke('text')
      .then((descText) => {
        expect(descText.trim()).to.equal(`${promptText}...`);
      });
  });

  it('should generate on the create page, and the redirects to the adlib play page', () => {
    cy.intercept('POST', /\/api\/trpc\/adlib\.create/).as('createAdlib');
    cy.intercept('GET', /\/api\/trpc\/adlib\.getAdlibByIdPlay/).as('getAdlibPlay');

    cy.visit('/create');

    const promptText = "A cat and funny robot take a walk";

    cy.get('[data-cy=prompt-input]').clear().type(promptText);

    cy.get('[data-cy=prompt-submit-btn]').click();

    cy.wait('@createAdlib', { timeout: 20000 }).its('response.statusCode').should('equal', 200);

    cy.wait('@getAdlibPlay').its('response.statusCode').should('equal', 200);


    cy.get('[data-cy=adlib-play-description]', { timeout: 20_000 })
      .invoke('text')
      .then((descText) => {
        expect(descText.trim()).to.equal(`${promptText}...`);
      });
  });
})