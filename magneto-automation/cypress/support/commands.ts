/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import "cypress-real-events/support";
import { loginPage } from "../core/ui/pages/loginPage";

Cypress.Commands.add("loginToMagento", () => {
    // Read user credentials from environment variables
  const email = Cypress.env("USER_EMAIL");
  const password = Cypress.env("USER_PASSWORD");
  loginPage.login(email, password);
});
Cypress.Commands.add("getRandomProduct", () => {
  cy.fixture("products").then((data) => {
    const products = data.productName;
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    cy.wrap(randomProduct);
  });
});
