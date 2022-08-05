import React from 'react';
import { Delete, Edit } from '../../assets/icons';
import { cn } from '../../utils';
import { contacts } from './mocks';
import s from './Contacts.module.css';

type Props = {
  className?: string
};

export function Contacts(x: Props) {
  return (
    <div className={cn(s.contacts, x.className)}>
      <div className={s.contactControls}>
      </div>
      <div className={s.list}>
        <span className={s.listHeader}>№</span>
        <span className={s.listHeader}>Имя</span>
        <span className={s.listHeader}>Телефон</span>
        <div className={s.deleteWrapper}>
          <Delete width={25} className={s.delete} />
        </div>
        <span></span>

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
      <div>
        <Edit width={20} className={s.edit} />
      </div>
    </>
  );
}
