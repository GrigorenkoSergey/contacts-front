import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { contacts } from '../../store';
import { Delete, Add, User, DoorExit } from '../../assets/icons';
import { cn } from '../../utils';
import { Popup } from '../Popup';
import {
  RemoveContactsPopup, ConfirmExitPopup,
  EditContactPopup, AddContactPopup, ContactsList,
} from './components';

import s from './Contacts.module.css';

type Popup = 'exit' | 'edit' | 'delete' | 'add';

type PopupProps = {
  onAccept: () => void
  onCancel: () => void
};
const popupMapper: (x: PopupProps) => Record<Popup, JSX.Element> = x => ({
  add: <AddContactPopup {...x} />,
  delete: <RemoveContactsPopup {...x} />,
  edit: <EditContactPopup {...x} />,
  exit: <ConfirmExitPopup {...x} />
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

      <div className={s.header}>
        <div className={cn(s.iconWrapper, s.user)}>
          <User width={30} />
        </div>
        <span className={s.userName}>Константин Констинтинопольский</span>

        <section className={s.search}>
          <input type="text"
                 className={s.searchInput}
                 value={filter}
                 onChange={e => setFilter(e.target.value)}></input>
        </section>

        <DoorExit width={25}
                  className={s.signOut}
                  onClick={() => setPopup('exit')} />
      </div>

      <div className={s.list}>

        <div className={s.titleRow}>
          <span className={s.listHeader}>№</span>
          <span className={cn(s.listHeader, s.name)}>Имя</span>
          <span className={cn(s.listHeader, s.phone)}>Телефон</span>
          <span className={cn(s.listHeader, s.emai)}>Email</span>

          <div className={s.iconWrapper}>
            { contacts.selectedIds.size > 0 && (
              <Delete width={25}
                      className={s.delete}
                      onClick={() => setPopup('delete')} />
            ) }
          </div>

          <div className={s.iconWrapper}>
            <Add width={20}
                 className={s.add}
                 onClick={() => setPopup('add')} />
          </div>
        </div>

        <ContactsList list={filteredContacts}
                      onEditClick={() => setPopup('edit')} />
      </div>

    </div>
  );
});
