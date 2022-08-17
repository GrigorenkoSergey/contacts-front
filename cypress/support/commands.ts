/// <reference types="cypress" />

import successResponse from '../fixtures/user1-login-response.json';
import contacts from '../fixtures/user1-contacts.json';

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
