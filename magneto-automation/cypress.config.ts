import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default defineConfig({
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000, // Sets global default command timeout to 10 seconds
    baseUrl: "https://magento.softwaretestingboard.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*-spec.ts",
  },
  env: {
    // Load environment variables from .env file
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: true,
    json: true,
  },
});
