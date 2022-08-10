import React from 'react';
import { Options } from '../../../../assets/icons';
import { contacts } from '../../../../store';
import s from './ContactList.module.scss';

type Props = {
  contact: typeof contacts.contacts[number]
  onEditClick: (id: number) => void
  onNameClick: () => void
};

export const ContactItem = (x: Props) => {
  const { contact, onNameClick, onEditClick, } = x;
  const { id } = contact;

  return (
    <>
      <li className={s.name}>
        <span className={s.nameValue}
              onClick={onNameClick}>
          { contact.name }
        </span>
      </li>

      <li className={s.phone}>
        <span className={s.phoneValue}>{ contact.phone }</span>
      </li>

      <li className={s.email}>
        <span className={s.emailValue}>{ contact.email }</span>
      </li>

      <li className={s.options}>
        <Options width={25}
                 height={25}
                 onClick={() => onEditClick(id)} />
      </li>
    </>
  );
};
