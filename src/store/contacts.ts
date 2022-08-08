import { makeAutoObservable } from 'mobx';
import * as api from '../api';

class Contacts {
  contacts: api.Contact[] = [];
  idsToRemove = new Set<number>();
  selectedId = 0;

  constructor() {
    makeAutoObservable(this);
  }

  getContacts() {
    this.contacts = api.getContacts();
  }

  createContact(x: Omit<api.Contact, 'id'>) {
    const { email, name, phone } = x;
    this.selectedId = 0;

    const existingContact = this.contacts.find(c =>
      c.name === name && (
        (email ? c.email === email : false)
         || (phone ? c.phone === phone : false)
      ));

    if (existingContact) return { error: 'Текущий контакт уже существует!' };

    const result = api.createContact(x);
    if ('error' in result) return { error: 'Не удалось создать контакт!' };

    const indexToInsert = this.contacts.findIndex(v => v.name > x.name);
    const id = result.data.id;
    this.contacts.splice(indexToInsert, 0, { ...x, id });
    return result.data.id;
  }

  updateContact(x: api.Contact) {
    const { email, name, phone, id } = x;
    const existingContact = this.contacts.find(c =>
      c.name === name
      && c.id !== id
      && (c.email === email || c.phone === phone)
    );

    if (existingContact) return { error: 'Изменения совпадают с уже существующим контактом!' };

    const result = api.updateContact(x);
    if ('error' in result) return { error: 'Не удалось обновить контакт.' };

    const receivedId = result.data.id;

    if (receivedId !== id) {
      throw new Error(
        'Ошибка в логике программы: обновляемый id на сервере не совпадает с id в хранилище!'
      );
    }

    const contact = this.contacts.find(c => c.id === id);
    if (contact) Object.assign(contact, x);
    this.selectedId = 0;
    return id;
  }

  addToRemoval(id: number) {
    this.idsToRemove.add(id);
  }

  removeFromRemoval(id: number) {
    this.idsToRemove.delete(id);
  }

  removeContacts() {
    if (!api.removeContacts(Array.from(this.idsToRemove))) return;

    this.contacts = this.contacts.filter(c => !this.idsToRemove.has(c.id));
    this.idsToRemove.clear();
  }
}

const contacts = new Contacts();
export { contacts };

