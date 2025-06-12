class ProductPage {
  // Visit the product page by product name
  visit(productName: string) {
    cy.visit(`/catalogsearch/result/?q=${productName}`);
  }
  // Getters for product page elements
  get productLists() {
    return cy.get(".product-item-info").should("be.visible");
  }
  get productItem() {
    return cy.get(".product-item").should("be.visible");
  }
  get searchResults() {
    return cy.get(".product.name.product-item-name").should("be.visible");
  }

  get addToWishlistButton() {
    return cy.get(".action.towishlist").should("be.visible");
  }
  verifyProductInSearchResults(productName: string) {
    this.searchResults.should("contain.text", productName);
  }

  // Method to add a product to the cart from the product list
  addToCartFromProductList() {
    this.productLists.its("length").then((count) => {
      const limit = Math.min(2, count);
      for (let i = 0; i < limit; i++) {
        this.productItem.eq(i).realHover().wait(1000); // Ensure any hidden buttons are revealed
        // .within(() => {
        this.productItem
          .eq(i)
          .find('button:contains("Add to Cart")')
          .should("be.visible")
          .click({ force: true });
        // });
      }
    });
  }

  addToWishlistFromProductList() {

    // Get all product items and process up to 3
    this.productLists.its("length").then((count) => {
      const limit = Math.min(2, count);
      for (let i = 0; i < limit; i++) {
        // Hover and scope to the specific product item
        this.productItem
          .eq(i)
          .realHover()
          .wait(2000)
          .within(() => {
            this.addToWishlistButton
              .should("be.visible")
              .click({ force: true });
          });

        // Verify and close success message
        // First ensure the message container exists and is visible
        cy.wait(2000); // Wait for the message to appear
        cy.get(".message-success")
          .should("exist")
          .and("be.visible")
          .and("contain", "has been added to your Wish List")
          .find("a")
          .should("be.visible") // Ensure the link is visible too
          .as('wishlistSuccessLink');
          cy.get('@wishlistSuccessLink').click({ multiple: true, force: true });
          // .click({multiple: true});

         cy.wait(500); // Brief pause between actions
      }
    });
  }
}
export const productPage = new ProductPage();
