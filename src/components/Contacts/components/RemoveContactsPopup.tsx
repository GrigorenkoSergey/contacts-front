import React from 'react';
import { contacts } from '../../../store';
import { Popup } from '../..';

type Props = {
  onAccept: () => void
  onCancel: () => void
};

export const RemoveContactsPopup = (x: Props) => {
  const contact = contacts.contacts.find(c => c.id === contacts.selectedId);
  const name = contact?.name ?? '';

  const handleAccept = () => {
    contacts.removeContact();
    x.onAccept();
  };
  return (
    <Popup onAccept={handleAccept} onCancel={x.onCancel} title="Удаление...">
      { `Вы действительно хотите удалить контакт "${name}"?` }
    </Popup>
  );
};
