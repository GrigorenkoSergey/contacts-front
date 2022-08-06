import React, { useState } from 'react';
import { Delete, Edit, Add, User, DoorExit } from '../../assets/icons';
import { cn } from '../../utils';
import { Popup } from '../Popup';
import { contacts } from './mocks';
import s from './Contacts.module.css';

type Props = {
  className?: string
};

export function Contacts(x: Props) {
  const [showPopup, setShowPopup] = useState(true);
  const openPopup = () => setShowPopup(true);

  return (
    <div className={cn(s.contacts, x.className)}>
      { showPopup && (
        <Popup title="Добавление контакта"
               onCancel={() => setShowPopup(false)}
               onAccept={() => setShowPopup(false)}>
          Popup
        </Popup>
      ) }

      <div className={s.header}>
        <div className={cn(s.iconWrapper, s.user)}>
          <User width={30} />
        </div>
        <span className={s.userName}>Константин Констинтинопольский</span>
        <Search />
        <DoorExit width={25}
                  className={s.signOut}
                  onClick={openPopup} />
      </div>

      <div className={s.list}>

        <div className={s.row}>
          <span className={s.listHeader}>№</span>
          <span className={s.listHeader}>Имя</span>
          <span className={s.listHeader}>Телефон</span>
          <span className={s.listHeader}>Email</span>
          <div className={s.iconWrapper}>
            <Delete width={25}
                    className={s.delete}
                    onClick={openPopup} />
          </div>
          <div className={s.iconWrapper}>
            <Add width={20}
                 className={s.add}
                 onClick={openPopup} />
          </div>
        </div>

        { contacts.map((c, i) => (
          <div className={s.row} key={c.id}>
            <span className={s.number}>{ i + 1 }</span>
            <ContactItem contact={c} onEditClick={openPopup} />
          </div>
        )) }

      </div>

    </div>
  );
}

type ContactItemProps = {
  contact: typeof contacts[number]
  onEditClick: () => void
};

function ContactItem(x: ContactItemProps) {
  const { contact, onEditClick } = x;
  return (
    <>
      <span className={s.name}>{ contact.name }</span>
      <span className={s.phone}>{ contact.phone }</span>
      <span className={s.email}>{ contact.email }</span>
      <label className={s.checkboxLabel}>
        <input type="checkbox" className={s.checkboxInput} />
        <span className={s.checkbox}></span>
      </label>
      <div className={s.iconWrapper}>
        <Edit width={20} className={s.edit} onClick={onEditClick} />
      </div>
    </>
  );
}

function Search() {
  return (
    <section className={s.search}>
      <input type="text" className={s.searchInput}></input>
    </section>
  );
}
