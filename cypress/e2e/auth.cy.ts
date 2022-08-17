import successResponse from '../fixtures/user1-login-response.json';
import contacts from '../fixtures/user1-contacts.json';

const apiUrl = 'https://contacts-app-takeoff-staff.herokuapp.com/api/v1';

describe('auth', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Can\'t go to page /contacts without login', () => {
    cy.window().then(w => w.location.assign('/contacts'));
    cy.contains(/войти/i);
    cy.contains(/логин/i);
    cy.contains(/пароль/i);
  });

  it('User may login', () => {
    const { login, enter, password } = makeInitialAliases();
    cy.get(login).click().type('john');
    cy.get(password).click().type('secret1');

    cy.intercept({ method: 'post', url: `${apiUrl}/login` }, successResponse);
    cy.intercept({ method: 'get', url: `${apiUrl}/contacts` }, contacts);
    cy.get(enter).click();

    cy.contains(/имя/i);
    cy.contains(/телефон/i);
    cy.contains(/email/i);
  });

  it('User may logout', () => {
    cy.login();
    cy.get('[data-cy="exit"]').click();
    cy.contains(/выход/i);

    cy.log('**We can decline exit**');
    cy.get('button').contains(/отмена/i).click();
    cy.contains(successResponse.data.fullname);

    cy.log('**Now we really decided to logout**');
    cy.get('[data-cy="exit"]').click();
    cy.get('button[type=submit]').click();
    cy.contains(/войти/i);

    cy.window().then(w => w.location.assign('/contacts'));
    cy.contains(/войти/i);
  });

  it('We should know about typos in login or password', () => {
    const { enter, login, password, form } = makeInitialAliases();
    cy.get(enter).should('have.attr', 'disabled');

    const wrongLoginResponse = { 'error': 'Login doesn\'t exist!' };
    cy.intercept({ method: 'post', url: `${apiUrl}/login` }, wrongLoginResponse);
    cy.get(login).type('john1');
    cy.get(password).type('secret1');
    cy.get(enter).click();
    cy.get(form).contains('Неизвестный логин');

    const wrongPasswordResponse = { 'error': 'Incorrect password!' };
    cy.intercept({ method: 'post', url: `${apiUrl}/login` }, wrongPasswordResponse);
    cy.get(login).clear().type('john');
    cy.get(password).clear().type('secret2');
    cy.get(enter).click();
    cy.get(form).contains('Неверный пароль');
  });
});

function makeInitialAliases() {
  const form = '@form';
  const login = '@login';
  const password = '@password';
  const enter = '@enter';

  cy.get('form').as(form.slice(1));
  cy.get('input[name=login]').as(login.slice(1));
  cy.get('input[name=password]').as(password.slice(1));
  cy.get('button').contains(/войти/i).as(enter.slice(1));

  return { form, login, password, enter };
}
