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
    const id = api.createContact(x);
    if (!id) return;

    const indexToInsert = this.contacts.findIndex(v => v.name > x.name);
    this.contacts.splice(indexToInsert, 0, { ...x, id });
  }

  updateContact(x: api.Contact) {
    if (!api.updateContact(x)) return;

    const contact = this.contacts.find(c => c.id === x.id);
    if (contact) Object.assign(contact, x);
  }

  selectContact(id: number) {
    this.idsToRemove.add(id);
  }

  removeFromSelection(id: number) {
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

