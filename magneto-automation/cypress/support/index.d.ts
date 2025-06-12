declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<void>;
  }

  interface Chainable {
    loginToMagento(): Chainable<void>;
    getRandomProduct(): Chainable<string>;
  }
  interface Chainable {
    realHover(): Chainable<JQuery<HTMLElement>>;
  }
}
