import React from 'react';
import { Delete, Edit, Add, User } from '../../assets/icons';
import { cn } from '../../utils';
import { contacts } from './mocks';
import s from './Contacts.module.css';

type Props = {
  className?: string
};

export function Contacts(x: Props) {
  return (
    <div className={cn(s.contacts, x.className)}>

      <div className={s.header}>
        <div className={cn(s.iconWrapper, s.user)}>
          <User width={30} />
        </div>
        <span className={s.userName}>Константин Констинтинопольский</span>
        <Search />

      </div>
      <div className={s.list}>
        <span className={s.listHeader}>№</span>
        <span className={s.listHeader}>Имя</span>
        <span className={s.listHeader}>Телефон</span>
        <div className={s.iconWrapper}>
          <Delete width={25} className={s.delete} />
        </div>
        <div className={s.iconWrapper}>
          <Add width={20} className={s.add} />
        </div>

        { contacts.map((c, i) => (
          <React.Fragment key={c.id}>
            <span>{ i + 1 }</span>
            <ContactItem contact={c} />
          </React.Fragment>
        )) }

      </div>
    </div>
  );
}

type ContactItemProps = {
  contact: typeof contacts[number]
};

function ContactItem(x: ContactItemProps) {
  const { contact } = x;
  return (
    <>
      <span className={s.name}>{ contact.name }</span>
      <span className={s.phone}>{ contact.phone }</span>
      <label className={s.checkboxLabel}>
        <input type="checkbox" className={s.checkboxInput} />
        <span className={s.checkbox}></span>
      </label>
      <div className={s.iconWrapper}>
        <Edit width={20} className={s.edit} />
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
