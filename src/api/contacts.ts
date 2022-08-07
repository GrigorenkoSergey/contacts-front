import { mockContacts } from './mocks';

export type Contact = typeof mockContacts[number];

export const getContacts = () => {
  return mockContacts;
};

export const removeContacts = (idList: number[]) => {
  return true;
};
