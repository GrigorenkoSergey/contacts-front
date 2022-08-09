import React from 'react';
import { Delete, Edit } from '../../../../assets/icons';
import { contacts } from '../../../../store';
import { Checkbox } from '../../../Checkbox';
import s from './ContactList.module.scss';

type Props = {
  contact: typeof contacts.contacts[number]
  onEditClick: (id: number) => void
  onNameDoubleClick: () => void
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  isChecked?: boolean
  onRemoveClick: (id?: number) => void
};

export const ContactItem = (x: Props) => {
  const { contact, onNameDoubleClick, onEditClick, onSelect, isChecked, onRemoveClick } = x;
  const { id } = contact;

  return (
    <>
      <div className={s.name}>
        <span className={s.nameValue}
              onDoubleClick={onNameDoubleClick}>
          { contact.name }
        </span>
      </div>

      <div className={s.phone}>
        <span className={s.phoneValue}>{ contact.phone }</span>
      </div>

      <div className={s.email}>
        <span className={s.emailValue}>{ contact.email }</span>
      </div>

      <div className={s.select}>
        <Checkbox className={s.select}
                  onChange={onSelect}
                  checked={isChecked} />
      </div>

      <div className={s.edit}>
        <Edit width={25}
              onClick={() => onEditClick(id)} />
      </div>
      <span className={s.itemDelete}>
        { isChecked && (
          <Delete width={25}
                  className={s.itemDeleteIcon}
                  onClick={() => onRemoveClick()} />
        ) }
      </span>
    </>
  );
};
