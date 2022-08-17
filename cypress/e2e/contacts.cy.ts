import contacts from '../fixtures/user1-contacts.json';

const isEqual = Cypress._.isEqual;

describe('auth', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });

  it('Should be able to add contact', () => {
    cy.get('[data-cy="add"]').click();
    const button = '@button';
    cy.get('button[type=submit]').as(button.slice(1)).should('have.attr', 'disabled');

    const name = 'Анна Ахматова';
    const phone = '89531764826';
    const email = 'arrogant007@yandex.ru';
    const notes = 'Бла-бла-бла...';

    cy.intercept({ method: 'post' }, req => {
      const expectedBody = { name, phone, email, notes, id: 0 };
      if (!isEqual(expectedBody, req.body)) return;
      req.reply({ body: { data: { ...expectedBody, id: 9999, } } });
    });

    cy.get('[name=name]').type(name);
    cy.get('[name=phone]').type(phone);
    cy.get('[name=email]').type(email);
    cy.get('[name=notes]').type(notes);
    cy.get(button).click();

    cy.contains(name);
    cy.contains(phone);
    cy.contains(email);
  });

  it('Should not be able to add contact with same name and phone or email', () => {
    const { list } = makeInitialAliases();

    cy.get('[data-cy="add"]').click();
    const add = '@button';
    cy.get('button[type=submit]').as(add.slice(1));
    const length = '@length';
    cy.get(list).children().its('length').as(length.slice(1));

    const name = 'Абакаров Хизри';
    const phone = '89881323890';
    const email = 'snoopycat@yandex.ru';

    cy.get('[name=name]').type(name);
    cy.get('[name=phone]').type(phone);
    cy.get(add).click();
    cy.contains('Текущий контакт уже существует');

    cy.get('button').contains('OK').click();
    cy.get('[name=phone]').clear();
    cy.get('[name=email]').clear().type(email);
    cy.get(add).click();
    cy.contains('Текущий контакт уже существует');

    cy.get('button').contains('Отмена').click();

    cy.get(list).children().its('length').then(curr => {
      cy.get(length).then(prev => expect(curr).to.eq(prev));
    });
  });

  it('Should be able to delete contact', () => {
    const { list } = makeInitialAliases();
    const person = contacts.data[0].name;

    cy.get(list).should('contain.text', person);
    cy.get('[data-cy="options"]').eq(0).click();
    cy.get('li').contains('Удалить').click();

    cy.log('**First click cancel**');
    cy.get('button').contains('Отмена').click();
    cy.get(list).should('contain.text', person);

    cy.log('**Now delete him**');
    cy.intercept({ method: 'delete' }, req => req.reply({ data: 'success' }));
    cy.get('[data-cy="options"]').eq(0).click();
    cy.get('li').contains('Удалить').click();
    cy.get('button').contains('OK').click();
    cy.get('[data-cy="contact-list"]').should('not.contain.text', person);
  });

  it('Should be able to update contact', () => {
    const person = contacts.data[0];
    const { list } = makeInitialAliases();

    cy.get(list).should('contain.text', person.name);
    cy.get('[data-cy="options"]').eq(0).click();
    cy.get('li').contains('Редактировать').click();

    const length = '@length';
    cy.get(list).children().its('length').as(length.slice(1));

    cy.intercept({ method: 'put' }, req => req.reply({ body: { data: req.body } }));
    cy.get('[data-cy=popup]').within(() => {
      cy.log('**Update button in enabled only if something really changed**');
      const OK = '@OK';
      cy.get('button').contains('OK').as(OK.slice(1)).should('be.disabled');
      cy.get('[name="name"]').type('яяя');
      cy.get('[name="phone"]').type('0');
      cy.get('[name="email"]').type('0');
      cy.get(OK).click();
    });

    cy.get(length).then(l1 => {
      cy.get(list).children().its('length')
        .then(l2 => expect(l1).to.eq(l2));
    });

    cy.get(list)
      .should('contain.text', person.name + 'яяя')
      .should('contain.text', person.phone + '0')
      .should('contain.text', person.email + '0');
  });

  it('The updated contact cannot be the same as another existing contact.', () => {
    const updatingPerson = contacts.data[0];
    const existingContact = contacts.data[1];
    const { list } = makeInitialAliases();

    cy.get('[data-cy="options"]').eq(0).click(); // try to update first person
    cy.get('li').contains('Редактировать').click();

    const length = '@length';
    cy.get(list).children().its('length').as(length.slice(1));

    cy.intercept({ method: 'put' }, req => req.reply({ body: { data: req.body } }));
    cy.get('[data-cy=popup]').within(() => {
      cy.get('[name="name"]').clear().type(existingContact.name);
      cy.get('[name="phone"]').clear().type(existingContact.phone);
      const OK = '@OK';
      cy.get('button').contains('OK').as(OK.slice(1)).click();
      cy.contains('Изменения совпадают');
      cy.get(OK).click();
    });
    cy.get('button').contains('Отмена').click();

    cy.get(length).then(l1 => {
      cy.get(list).children().its('length')
        .then(l2 => expect(l1).to.eq(l2));
    });

    cy.get(list)
      .should('contain.text', updatingPerson.name)
      .should('contain.text', updatingPerson.phone);
  });

  it('Should be able to filter contacts', () => {
    const { list, search } = makeInitialAliases();

    cy.get(list).should('not.contain.text', 'Нет контактов');
    const length = '@length';
    cy.get(list).children().its('length').as(length.slice(1));

    cy.get(search).type('сергей');
    cy.get(length).then(l1 => {
      cy.get(list).children().its('length').then(l2 => {
        expect(l1).to.be.gte(l2);
        cy.get(search).clear().type('89219916437');
        cy.get(list).children().its('length').then(l3 => {
          expect(l2).to.be.gte(l3);
        });
      });
    });
  });

  it('Contacts are inserted in alphabetical order', () => {
    const { add } = makeInitialAliases();

    const name = 'ААА';
    const phone = '89531764826';

    cy.intercept({ method: 'post' }, req => {
      req.reply({ body: { data: { ...req.body, id: 1000, } } });
    });

    cy.get(add).click();
    cy.get('[name=name]').type(name);
    cy.get('[name=phone]').type(phone);
    cy.get('[type="submit"]').click();
    cy.get('[data-cy="popup"]').should('not.exist');

    cy.get('[data-cy="contact-name"]').eq(0).should('contain.text', name);

    const nextName = 'ЯЯ';
    cy.intercept({ method: 'post' }, req => {
      req.reply({ body: { data: { ...req.body, id: 2000, } } });
    });

    cy.get(add).click();
    cy.get('[name=name]').type(nextName);
    cy.get('[name=phone]').type(phone);
    cy.get('[type="submit"]').click();
    cy.get('[data-cy="popup"]').should('not.exist');
    cy.get('[data-cy="contact-name"]').eq(-1).should('contain.text', nextName);

    const updatedName = 'АА';
    cy.intercept({ method: 'put' }, req => req.reply({ body: { data: req.body } }));
    cy.get('[data-cy=options').eq(-1).click();
    cy.get('li').contains('Редактировать').click();
    cy.get('[name=name]').clear().type(updatedName);
    cy.get('[type="submit"]').click();
    cy.get('[data-cy="popup"]').should('not.exist');
    cy.get('[data-cy="contact-name"]').eq(0).should('contain.text', updatedName);
    cy.get('[data-cy="contact-name"]').eq(-1).should('not.contain.text', nextName);
  });
});

function makeInitialAliases() {
  const list = '@list';
  const search = '@search';
  const add = '@add';

  cy.get('[data-cy="add"]').as(add.slice(1));
  cy.get('[data-cy="contact-list"]').as(list.slice(1));
  cy.get('[data-cy="search"]').as(search.slice(1));

  return { list, search, add };
}
