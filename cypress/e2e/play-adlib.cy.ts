describe('Play Adlib', () => {
  it('should allow navigation to home page and play', () => {
    cy.intercept('GET', /\/api\/trpc\/adlib\.getPaginated/).as('getPaginted');
    cy.intercept('GET', /\/api\/trpc\/adlib\.getAdlibByIdPlay/).as('getAdlibPlay');
    cy.intercept('POST', /\/api\/trpc\/adlib\.saveAdlibResult/).as('saveAdlibResult');

    cy.visit('/');

    cy.wait('@getPaginted').its('response.statusCode').should('equal', 200);

    cy.get('[data-cy=go-to-adlib-link]').first().click();

    cy.get('[data-cy=play-adlib-btn]').click();

    const answers = ['fluffy', 'blue', 'quickly', 'on the moon'];

    cy.get('[data-cy=adlib-answer-input]')
      .should('have.length.greaterThan', 0)
      .each(($el, index) => {
        const value = answers[index] ?? `answer-${index + 1}`;
        cy.wrap($el)
          .scrollIntoView()
          .clear({ force: true })
          .type(value, { force: true });
      });

    cy.get('[data-cy=generate-story-btn]').click();

    cy.wait('@saveAdlibResult').its('response.statusCode').should('equal', 200);

    cy.get('[data-cy=adlib-result-actions]').click();
  });

  it("should allow searching and then playing the adlib", () => {
    cy.intercept('GET', /\/api\/trpc\/adlib\.getPaginated/).as('getPaginted');
    cy.intercept('GET', /\/api\/trpc\/adlib\.getAdlibById/).as('getAdlibById');
    cy.intercept('GET', /\/api\/trpc\/adlib\.getAdlibByIdPlay/).as('getAdlibByIdPlay');
    cy.intercept('POST', /\/api\/trpc\/adlib\.saveAdlibResult/).as('saveAdlibResult');

    cy.visit('/');

    cy.wait('@getPaginted').its('response.statusCode').should('equal', 200);

    cy.get('[data-cy=browse-feed-card-title]')
      .first()
      .invoke('text')
      .then((firstTitle) => {
        const query = firstTitle.trim();

        cy.get('[data-cy=search-adlib-input]').clear().type(query);
        cy.get('[data-cy=search-adlib-submit-btn]').click();

        cy.wait('@getPaginted').its('response.statusCode').should('equal', 200);

        cy.get('[data-cy=browse-feed-card-title]').first().should('contain.text', query);

        cy.get('[data-cy=go-to-adlib-link]').first().click();

        cy.wait('@getAdlibById').its('response.statusCode').should('equal', 200);

        cy.get('[data-cy=play-adlib-btn]').click();

        cy.wait('@getAdlibByIdPlay').its('response.statusCode').should('equal', 200);

        const answers = ['fluffy', 'blue', 'quickly', 'on the moon'];

        cy.get('[data-cy=adlib-answer-input]')
          .should('have.length.greaterThan', 0)
          .each(($el, index) => {
            const value = answers[index] ?? `answer-${index + 1}`;
            cy.wrap($el)
              .scrollIntoView()
              .clear({ force: true })
              .type(value, { force: true });
          });

        cy.get('[data-cy=generate-story-btn]').click();

        cy.wait('@saveAdlibResult').its('response.statusCode').should('equal', 200);

        cy.get('[data-cy=adlib-result-actions]').click();
      });
  });
});