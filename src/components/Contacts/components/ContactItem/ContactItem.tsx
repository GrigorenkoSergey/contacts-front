import React from 'react';
import { contacts } from '../../../../store';
import { Edit } from '../../../../assets/icons';
import s from './ContactItem.module.css';

type Props = {
  contact: typeof contacts.contacts[number]
  onEditClick: () => void
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export const ContactItem = (x: Props) => {
  const { contact, onEditClick, onSelect } = x;

  return (
    <>
      <span className={s.name}>{ contact.name }</span>
      <span className={s.phone}>{ contact.phone }</span>
      <span className={s.email}>{ contact.email }</span>
      <label className={s.checkboxLabel}>
        <input type="checkbox"
               className={s.checkboxInput}
               onChange={onSelect} />
        <span className={s.checkbox}></span>
      </label>
      <div className={s.iconWrapper}>
        <Edit width={20} className={s.edit} onClick={onEditClick} />
      </div>
    </>
  );
};
