import React, { useRef, useState } from 'react';
import { Options } from '../../../../assets/icons';
import { contacts } from '../../../../store';
import { useOnClickOutside } from '../../../../utils';
import s from './ContactList.module.scss';

type Props = {
  contact: typeof contacts.contacts[number]
  onEditClick: (id: number) => void
  onNameClick: () => void
  onRemoveClick: (id: number) => void
};

export const ContactItem = (x: Props) => {
  const { contact, onNameClick, onEditClick, } = x;
  const [showMenu, setSnowMenu] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  const { id } = contact;

  useOnClickOutside(ref, () => setSnowMenu(false));

  const handleEditClick = () => {
    setSnowMenu(false);
    onEditClick(id);
  };

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

      <li className={s.options} ref={ref}>
        <Options width={25}
                 height={25}
                 onClick={() => setSnowMenu(!showMenu)} />
        { showMenu && (
          <ul className={s.optionList}>
            <li className={s.option} onClick={handleEditClick}>Редактировать</li>
            <li className={s.option}>Удалить</li>
          </ul>
        ) }
      </li>
    </>
  );
};
