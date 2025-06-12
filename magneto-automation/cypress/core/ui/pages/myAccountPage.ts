class MyAccountPage {
  verifyUserIsDirectedToMyAccountPage() {
    cy.url().should("include", "/customer/account/");
    cy.get(".page-title").should("contain", "My Account");
  }
}

export const myAccountPage = new MyAccountPage();
