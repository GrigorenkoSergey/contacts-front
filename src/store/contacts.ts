import { makeAutoObservable } from 'mobx';
import * as api from '../api';

class Contacts {
  contacts: api.Contact[] = [];
  selectedIds = new Set<number>();

  constructor() {
    makeAutoObservable(this);
  }

  getContacts() {
    console.log('contact.getContacts');
    this.contacts = api.getContacts();
  }

  selectContact(id: number) {
    this.selectedIds.add(id);
  }

  removeFromSelection(id: number) {
    this.selectedIds.delete(id);
  }

  removeContacts() {
    if (!api.removeContacts(Array.from(this.selectedIds))) return;

    this.contacts = this.contacts.filter(c => !this.selectedIds.has(c.id));
    this.selectedIds.clear();
  }
}

const contacts = new Contacts();
export { contacts };

