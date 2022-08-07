import { makeAutoObservable } from 'mobx';
import * as api from '../api';

class Contacts {
  contacts: api.Contact[] = [];
  selectedIds = new Set<number>();
  editingId = 0;

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

