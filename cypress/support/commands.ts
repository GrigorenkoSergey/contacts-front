/// <reference types="cypress" />

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import successResponse from '../fixtures/user1-login-response.json';
import contacts from '../fixtures/user1-contacts.json';

// https://github.com/americanexpress/jest-image-snapshot#optional-configuration
addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // 3%
  failureThresholdType: 'percent',
  capture: 'viewport',
  customDiffConfig: { threshold: 0.01 }, // for color comparison
});

Cypress.Commands.add('login', () => {
  const apiUrl = 'https://contacts-app-takeoff-staff.herokuapp.com/api/v1';
  cy.intercept({ method: 'get', url: `${apiUrl}/contacts` }, contacts).as('contacts');
  localStorage.setItem('token', successResponse.data.token);
  localStorage.setItem('fullName', successResponse.data.fullname);
  cy.wait('@contacts');
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
    }
  }
}
