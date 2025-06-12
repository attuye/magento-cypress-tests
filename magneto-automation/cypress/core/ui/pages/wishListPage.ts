class WishListPage {

  visit() {
    cy.visit('/wishlist');
  }

  addAllToCart() {
    cy.wait(2000); // Wait for the page to load
    cy.contains('button', 'Add All to Cart').should('be.visible').click({force: true});
    cy.wait(2000); // Wait for the message to appear
    cy.get('.message-success').should('contain', 'have been added to shopping cart');
  }

}
export const wishListPage = new WishListPage();