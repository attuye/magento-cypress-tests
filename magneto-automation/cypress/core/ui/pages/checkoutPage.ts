import { faker } from "@faker-js/faker";

class CheckoutPage {
  visit() {
    cy.visit("/checkout");
  }
  get checkoutButton() {
    return cy.get(".checkout-button");
  }

  get existingShippingAddress() {
    return cy.get("shipping-address-item.selected-item").should("be.visible");
  }
  get addNewAddressButton() {
    return cy.get(".add-new-address-button");
  }
  get companyInput() {
    return cy.get("input[name='company']").should("be.visible");
  }
  get streetInput0() {
    return cy.get('input[name="street[0]"]').should("be.visible");
  }
  get streetInput1() {
    return cy.get('input[name="street[1]"]').should("be.visible");
  }
  get streetInput2() {
    return cy.get('input[name="street[2]"]').should("be.visible");
  }
  get cityInput() {
    return cy.get('input[name="city"]').should("be.visible");
  }
  get stateInput() {
    return cy.get('input[name="region_id"]').should("be.visible");
  }
  // Updated state input handling
  get stateDropdown() {
    return cy.get('select[name="region_id"]').should("be.visible");
  }

  get stateOptions() {
    return this.stateDropdown.find('option:not([value=""])'); // Exclude empty/default option
  }

  get zipCodeInput() {
    return cy.get('input[name="postcode"]').should("be.visible");
  }
  get phoneInput() {
    return cy.get('input[name="telephone"]').should("be.visible");
  }
  get nextButton() {
    return cy.contains("button", "Next").should("be.visible");
  }
  get placeOrderButton() {
    return cy.contains("button", "Place Order").should("be.visible");
  }
  get shippingMethods() {
    return cy.get(".table-checkout-shipping-method tbody tr.row");
  }
  get orderConfirmationMessage() {
    return cy.get(".checkout-success", {timeout: 20000}).should("be.visible");
  }
  generateRandomAddress() {
    return {
      company: faker.company.name(),
      street0: faker.location.streetAddress(),
      street1: faker.location.secondaryAddress(),
      street2: faker.location.buildingNumber(),
      city: faker.location.city(),
      zipCode: faker.location.zipCode("#####"),
      phone: faker.phone.number(),
    };
  }

  
  fillBillingAddressForm() {
    // 1. Ensure the overall checkout container is visible.
    cy.get(".checkout-container", { timeout: 15000 }).should("be.visible");

    cy.get(".opc-progress-bar", {
      timeout: 15000,
    }).should("be.visible"); // This will wait for one of these to become visible.

    cy.wait(2000);
    // 3. Now that we're sure the address section is loaded and stable, perform the checks.
    cy.get("body").then(($body) => {
    
      const newAddressFormVisible = $body
        .find('input[name="company"]')
        .is(":visible");

      // Check for the existing selected address item. This does NOT fail if not visible.
      cy.wait(2000); // Wait for any animations to settle
     
      const existingAddressSelected = $body
        .find(".shipping-address-item.selected-item")
        .is(":visible");
      if (newAddressFormVisible) {
        cy.log("Scenario: Filling out new billing address");

        const address = this.generateRandomAddress();

        // These commands WILL retry until the element is found and actionable.
        // Since we're in the 'newAddressFormVisible' branch, we expect these to pass.
        this.companyInput.clear().type(address.company);
        this.streetInput0.clear().type(address.street0);
        this.streetInput1.clear().type(address.street1);
        this.streetInput2.clear().type(address.street2);
        this.cityInput.clear().type(address.city);
        this.zipCodeInput.clear().type(address.zipCode);
        this.phoneInput.clear().type(address.phone);
        // Handle state dropdown (if exists)
        this.stateDropdown.should("exist").then(($dropdown) => {
          cy.wrap($dropdown)
            .find("option")
            .then(($options) => {
              if ($options.length > 1) {
                const randomIndex = Math.floor(Math.random() * $options.length);
                const value = $options.eq(randomIndex).val();
                if (value) {
                  cy.wrap($dropdown).select(value);
                }
              }
            });
        });


        this.selectRandomShippingMethod();
        this.nextButton.click();
      } else if (existingAddressSelected) {
        
        this.selectRandomShippingMethod();
        this.nextButton.click();
      } else {
        cy.log(
          "ERROR: Neither new address form nor an existing selected address is visible after the common section loaded."
        );
      }
    });
  }

  placeOrder() {
    this.placeOrderButton.click();
    // Verify that the order confirmation message is displayed
    this.orderConfirmationMessage.should("contain", "Your order number is:");
  }

  selectRandomShippingMethod() {
    // Get all available shipping method rows
    this.shippingMethods.then(($methods) => {
      // Select random row
      const randomIndex = Math.floor(Math.random() * $methods.length);
      const randomMethod = $methods.eq(randomIndex);

      // Click the radio button and verify selection
      cy.wrap(randomMethod)
        .click() // Click the entire row (Magento typically handles this)
        .find("input.radio")
        .should("be.checked");
    });
  }
}
export const checkoutPage = new CheckoutPage();
