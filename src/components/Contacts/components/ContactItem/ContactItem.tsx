import React from 'react';
import { Edit } from '../../../../assets/icons';
import { contacts } from '../../../../store';
import s from './ContactItem.module.css';

type Props = {
  contact: typeof contacts.contacts[number]
  onEditClick: (id: number) => void
  onNameDoubleClick: () => void
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export const ContactItem = (x: Props) => {
  const { contact, onNameDoubleClick, onEditClick, onSelect } = x;
  const { id } = contact;

  return (
    <>
      <span className={s.name}
            onDoubleClick={onNameDoubleClick}>
        { contact.name }
      </span>
      <span className={s.phone}>{ contact.phone }</span>
      <span className={s.email}>{ contact.email }</span>

      <label className={s.checkboxLabel}>
        <input type="checkbox"
               className={s.checkboxInput}
               onChange={onSelect} />
        <span className={s.checkbox}></span>
      </label>

      <div className={s.iconWrapper}>
        <Edit width={20} className={s.edit} onClick={() => onEditClick(id)} />
      </div>
    </>
  );
};
