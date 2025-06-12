import { faker } from "@faker-js/faker"; // Importing the faker library for generating random data

class RegistrationPage {
  // Method to visit the registration page
  visit() {
    cy.visit("/customer/account/create/");
  }

  // Getters for the registration page elements

  get firstNameInput() {
    return cy.get("#firstname").should("be.visible");
  }
  get lastNameInput() {
    return cy.get("#lastname").should("be.visible");
  }

  get emailInput() {
    return cy.get("#email_address").should("be.visible");
  }
  get passwordInput() {
    return cy.get("#password").should("be.visible");
  }
  get confirmPasswordInput() {
    return cy.get("#password-confirmation").should("be.visible");
  }

  // Method to click the "Create an Account" button
  clickCreateAccount() {
    cy.contains("button", "Create an Account").should("be.visible").click();
  }

  // Property to store the registered user data
  public registeredUser: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  } | null = null;

  // Method to generate a random user using faker
  generateRandomUser() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({
      firstName,
      lastName,
      provider: "example.com",
    });
    const password = faker.internet.password();

    return {
      firstName,
      lastName,
      email,
      password,
    };
  }

  // Method to fill in the registration form
  fillRegistrationForm() {
    const user = this.generateRandomUser();
    this.registeredUser = user;

    // Using the generated user data to fill in the form fields
    this.firstNameInput.type(user.firstName);
    this.lastNameInput.type(user.lastName);
    this.emailInput.type(user.email);
    this.passwordInput.type(user.password);
    this.confirmPasswordInput.type(user.password);
    this.clickCreateAccount();
  }
  // Method to verify that the registration was successful
  verifyRegistrationSuccess() {
    cy.get(".message-success")
      .should("be.visible")
      .should("contain", "Thank you for registering with Main Website Store.");
    // Verify that the registered user data matches the data used in the form

    if (this.registeredUser) {
      cy.get(".logged-in").should(
        "contain",
        `Welcome, ${this.registeredUser.firstName} ${this.registeredUser.lastName}!`
      );
    }
  }
}
// Export the RegistrationPage class for use in tests
export const registrationPage = new RegistrationPage();
