import React from 'react';
import { contacts } from '../../../../store';
import { ContactItem } from '../ContactItem';
import s from './ContactList.module.css';

type Popup = 'edit' | 'info';

type Props = {
  list: typeof contacts.contacts[number][]
  setPopup: (w: Popup) => void
};

export const ContactsList = (x: Props) => {
  const { list, setPopup } = x;

  const handleItemSelect = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) contacts.addToRemoval(id);
    else contacts.removeFromRemoval(id);
  };

  const handleNameDoubleClick = (id: number) => {
    contacts.selectedId = id;
    setPopup('info');
  };

  const handleEditClick = (id: number) => {
    contacts.selectedId = id;
    setPopup('edit');
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
                         onNameDoubleClick={() => handleNameDoubleClick(c.id)}
                         onEditClick={handleEditClick}
                         onSelect={e => handleItemSelect(e, c.id)} />
          </div>
        )) }
    </div>
  );
};
