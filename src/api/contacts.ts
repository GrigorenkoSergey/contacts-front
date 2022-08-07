import { mockContacts } from './mocks';

export type Contact = typeof mockContacts[number];

export const getContacts = () => {
  return mockContacts;
};

export const createContact = (contact: Omit<Contact, 'id'>) => {
  const indexToInsert = mockContacts.findIndex(v => v.name > contact.name);
  const id = Math.max(...mockContacts.map(c => c.id)) + 1;
  mockContacts.splice(indexToInsert, 0, { ...contact, id });
  return id;
};

export const removeContacts = (idList: number[]) => {
  return true;
};
