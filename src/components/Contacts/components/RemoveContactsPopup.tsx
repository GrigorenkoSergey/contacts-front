import React from 'react';
import { contacts } from '../../../store';
import { Popup } from '../..';

type Props = {
  onAccept: () => void
  onCancel: () => void
};

export const RemoveContactsPopup = (x: Props) => {
  const handleAccept = () => {
    contacts.removeContacts();
    x.onAccept();
  };
  return (
    <Popup onAccept={handleAccept} onCancel={x.onCancel} title="Удаление...">
      Вы действительно хотите удалить данные контакты?
    </Popup>
  );
};
