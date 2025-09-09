describe('SauceDemo E2E Flow', () => {
  it('Full E2E Test without console logs, 2 assertions per step', () => {
    // 1. Login
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.url().should('include', '/inventory');
    cy.get('.title').should('have.text', 'Products');

    // 2. Add single product
    cy.get('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1').and('be.visible');
    cy.get('button[data-test="remove-sauce-labs-backpack"]').should('be.visible').and('contain.text', 'Remove');

    // 3. Remove single product
    cy.get('button[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('not.exist');
    cy.get('button[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').and('contain.text', 'Add to cart');

    // 4. Add multiple products
    cy.get('button[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('button[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();

    cy.get('.shopping_cart_badge').should('have.text', '3').and('be.visible');
    cy.get('button[data-test="remove-sauce-labs-bike-light"]').should('be.visible').and('contain.text', 'Remove');

    // 5. Remove multiple products
    cy.get('button[data-test="remove-sauce-labs-bike-light"]').click();
    cy.get('button[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1').and('be.visible');
    cy.get('button[data-test="remove-sauce-labs-fleece-jacket"]').should('be.visible').and('contain.text', 'Remove');

    // 6. Remove all
    cy.get('button[data-test="remove-sauce-labs-fleece-jacket"]').click();
    cy.get('.shopping_cart_badge').should('not.exist');
    cy.get('button[data-test="add-to-cart-sauce-labs-fleece-jacket"]').should('be.visible').and('contain.text', 'Add to cart');

    // 7. Checkout
    cy.get('button[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('button[data-test="checkout"]').click();
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').type('12345');
    cy.get('input[data-test="continue"]').click();
    cy.get('button[data-test="finish"]').click();

    cy.get('.complete-header').should('have.text', 'Thank you for your order!').and('be.visible');
    cy.url().should('include', '/checkout-complete');

    // 8. Logout
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();

    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.get('#login-button').should('be.visible').and('contain.text', 'Login');
  });
});
