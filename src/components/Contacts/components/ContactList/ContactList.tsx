import React from 'react';
import { contacts } from '../../../../store';
import { ContactItem } from '..';
import s from './ContactList.module.css';

type ContactsListProps = {
  list: typeof contacts.contacts[number][]
  onEditClick: (id: number) => void
};

export const ContactsList = (x: ContactsListProps) => {
  const { list, onEditClick } = x;

  const handleItemSelect = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) contacts.selectContact(id);
    else contacts.removeFromSelection(id);
  };

  return (
    <div className={s.list}>
      { list.length === 0
        ? (
          <div className={s.row}>
            <span>Нет контактов...</span>
          </div>
        )
        : list.map((c, i) => (
          <div className={s.row} key={c.id}>
            <span className={s.number}>{ i + 1 }</span>
            <ContactItem contact={c}
                         onSelect={e => handleItemSelect(e, c.id)}
                         onEditClick={() => onEditClick(c.id)} />
          </div>
        )) }
    </div>
  );
};
