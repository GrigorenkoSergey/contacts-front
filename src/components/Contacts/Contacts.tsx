import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { contacts } from '../../store';
import { Delete, Add, User, DoorExit } from '../../assets/icons';
import { cn } from '../../utils';
import { Popup } from '../Popup';
import {
  RemoveContactsPopup, ConfirmExitPopup,
  ContactList, ContactPopup,
} from './components';

import s from './Contacts.module.scss';

type Popup = 'exit' | 'edit' | 'delete' | 'add' | 'info';

type PopupProps = {
  onAccept: () => void
  onCancel: () => void
};
const popupMapper: (x: PopupProps) => Record<Popup, JSX.Element> = x => ({
  add: <ContactPopup {...x} type="add" />,
  edit: <ContactPopup {...x} type="edit" />,
  info: <ContactPopup {...x} type="info" />,
  delete: <RemoveContactsPopup {...x} />,
  exit: <ConfirmExitPopup {...x} />,
});

type Props = {
  className?: string
};

export const Contacts = observer((x: Props) => {
  const [popup, setPopup] = useState<Popup>();
  const [filter, setFilter] = useState('');

  useEffect(() => contacts.getContacts(), []);

  const filteredContacts = !filter
    ? contacts.contacts
    : contacts.contacts.filter(
      ({ name, email, phone }) => {
        const re = new RegExp(filter, 'i');
        return re.test(name) || re.test(email) || re.test(phone);
      }
    );

  const onCancel = () => setPopup(undefined);
  const onAccept = onCancel;

  return (
    <div className={cn(s.contacts, x.className)}>
      { popup && popupMapper({ onCancel, onAccept })[popup] }

      <ContactList list={filteredContacts}
                   setPopup={setPopup} />
    </div>
  );
});
