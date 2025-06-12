import { registrationPage } from "../../core/ui/pages/registrationPage";
import { myAccountPage } from "../../core/ui/pages/myAccountPage";
import { productPage } from "../../core/ui/pages/productPage";
import { cartPage } from "../../core/ui/pages/cartPage";
import { wishListPage } from "../../core/ui/pages/wishListPage";
import { checkoutPage } from "../../core/ui/pages/checkoutPage";

describe("Test scenarios for Guest users", () => {
 
  it("Test Case (A): Registration flow with login validation ", () => {
    registrationPage.visit();
    registrationPage.fillRegistrationForm();
    registrationPage.verifyRegistrationSuccess();
    myAccountPage.verifyUserIsDirectedToMyAccountPage();
  });
 
  it("Test Case (D): Search and validate results", () => {
    cy.getRandomProduct().then((product: string) => {
        // Visit the product page using the random product name
          productPage.visit(product);
          productPage.verifyProductInSearchResults(product);
        })

  });
});
describe("Test scenarios for Logged-in users", () => {
  beforeEach(() => {
    // Log in using the registered user data
    cy.loginToMagento();
  });

  it("Test Case (B): Place order with multiple products (apply price calculation checks)", () => {
    cy.getRandomProduct().then((product: string) => {
        // Visit the product page using the random product name
          productPage.visit(product);
        });
    
        // Add the product to the cart
        productPage.addToCartFromProductList();
        // Navigate to the cart page
        cartPage.visit();
        cartPage.getAndVerifyTotalPrice()
  });
  it("Test Case (C): Add products in Wishlist and checkout from wishlist ", () => {
    cy.getRandomProduct().then((product: string) => {
          // Visit the product page using the random product name
          productPage.visit(product);
        });
    
        // Add products to the wish list from the product list
        productPage.addToWishlistFromProductList();
        // Navigate to wish list page
        wishListPage.visit();
        // Add all items to the cart from the wish list
        wishListPage.addAllToCart();
        // Navigate to the checkout page
        checkoutPage.visit();
        // Fill in the billing address form
        checkoutPage.fillBillingAddressForm();
        // Place the order
        checkoutPage.placeOrder();
        // checkoutPage.selectRandomShippingMethod()
  });

});

