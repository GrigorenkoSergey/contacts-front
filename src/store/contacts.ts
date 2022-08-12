import { makeAutoObservable, runInAction } from 'mobx';
import * as api from '../api';
import { auth } from './auth';

class Contacts {
  contacts: api.Contact[] = [];
  selectedId = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchContacts() {
    const result = await api.getContacts(auth.token);
    if ('error' in result) {
      return /auth/i.test(result.error) && auth.logout();
    }
    runInAction(() => {
      this.contacts = result.data;
    });
    return true;
  }

  async createContact(x: Omit<api.Contact, 'id'>) {
    const { email, name, phone } = x;
    this.selectedId = 0;

    const existingContact = this.contacts.find(c =>
      c.name === name && (
        (email ? c.email === email : false)
         || (phone ? c.phone === phone : false)
      ));

    if (existingContact) return { error: 'Текущий контакт уже существует!' };

    const result = await api.createContact(auth.token, x);
    if ('error' in result) return { error: result.error };

    const indexToInsert = this.contacts.findIndex(v => v.name > x.name);
    const id = result.data.id;

    this.contacts.splice(indexToInsert, 0, { ...x, id });
    return result.data.id;
  }

  async updateContact(x: api.Contact) {
    const { email, name, phone, id } = x;
    const existingContact = this.contacts.find(c =>
      c.name === name
      && c.id !== id
      && (c.email === email || c.phone === phone)
    );

    if (existingContact) return { error: 'Изменения совпадают с уже существующим контактом!' };

    const result = await api.updateContact(auth.token, x);
    if ('error' in result) return { error: result.error };

    const receivedId = result.data.id;

    if (receivedId !== id) {
      throw new Error(
        'Ошибка в логике программы: обновляемый id на сервере не совпадает с id в хранилище!'
      );
    }

    const index = this.contacts.findIndex(c => c.id === id);
    if (index !== -1) this.contacts.splice(index, 1, x);
    this.selectedId = 0;
    return id;
  }

  async removeContact() {
    const result = await api.removeContact(auth.token, this.selectedId);
    if ('error' in result) return;

    this.contacts = this.contacts.filter(c => c.id !== this.selectedId);
    this.selectedId = 0;
  }
}

const contacts = new Contacts();
export { contacts };
