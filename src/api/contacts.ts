import { mockContacts } from './mocks';

type Response<T> = {
  data: T
  meta?: unknown
} | {
  error: string
  meta?: unknown
};

export type Contact = typeof mockContacts[number];

export const getContacts = () => {
  return mockContacts;
};

export const createContact = (contact: Omit<Contact, 'id'>): Response<{id: number}> => {
  let indexToInsert = mockContacts.findIndex(v => v.name > contact.name);
  if (indexToInsert === -1) indexToInsert = mockContacts.length;

  const id = Math.max(...mockContacts.map(c => c.id)) + 1;
  mockContacts.splice(indexToInsert, 0, { ...contact, id });
  return { data: { id } };
};

export const removeContacts = (idList: number[]): Response<true> => {
  return { data: true };
};

export const updateContact = (x: Contact): Response<{id: number}> => {
  const contact = mockContacts.find(c => x.id === c.id);
  if (!contact) return { error: 'Контакта не существует!' };

  Object.assign(contact, x);
  return { data: { id: x.id } };
};
