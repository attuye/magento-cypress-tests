
class LoginPage {
  // Method to visit the login page
  visit() {
    cy.visit("/customer/account/login");
  }
  get emailInput() {
    return cy.get("#email").should("be.visible");
  }
  get passwordInput() {
    return cy.get("#pass").should("be.visible");
  }
  clickSignIn() {
    cy.contains("button", "Sign In").should("be.visible").click();
  }
  // Method to fill in the login form
  login(email: string, password: string) {
    this.visit();
    // Read the registered user data from a fixture file
    
      this.emailInput.type(email);
      this.passwordInput.type(password);
      this.clickSignIn();
  }
}
export const loginPage = new LoginPage();
