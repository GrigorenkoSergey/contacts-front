import React from 'react';
import { contacts } from '../../../store';
import { ContactItem } from './ContactItem';

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
    <>
      { list.map((c, i) => (
        <React.Fragment key={c.id}>
          <span>{ i + 1 }</span>
          <ContactItem contact={c}
                       onNameDoubleClick={() => handleNameDoubleClick(c.id)}
                       onEditClick={handleEditClick}
                       onSelect={e => handleItemSelect(e, c.id)} />
        </React.Fragment>
      )) }
    </>
  );
};
