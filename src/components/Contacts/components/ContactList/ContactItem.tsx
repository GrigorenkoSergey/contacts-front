import React, { useEffect, useRef, useState } from 'react';
import { Options } from '../../../../assets/icons';
import { contacts } from '../../../../store';
import { useOnClickOutside } from '../../../../utils';
import s from './ContactList.module.scss';

type Props = {
  contact: typeof contacts.contacts[number]
  onEditClick: (id: number) => void
  onNameClick: () => void
  onRemoveClick: (id: number) => void
  parentRef: React.RefObject<HTMLUListElement>
};

export const ContactItem = (x: Props) => {
  const { contact, onNameClick, onEditClick, onRemoveClick, parentRef } = x;
  const [showMenu, setShowMenu] = useState(false);
  const option = useRef<HTMLLIElement>(null);
  const menu = useRef<HTMLUListElement>(null);

  const { id } = contact;

  useOnClickOutside(option, () => setShowMenu(false));

  useEffect(() => {
    const [menuDom, parentDom, optionDom] = [menu.current, parentRef.current, option.current];
    if (!menuDom || !parentDom || !optionDom) return;

    const menuBottom = menuDom.getBoundingClientRect().bottom;
    const parentBottom = parentDom.getBoundingClientRect().bottom;
    const { marginBottom, paddingBottom } = getComputedStyle(parentDom);
    const delta = menuBottom - (parentBottom - parseFloat(marginBottom) - parseFloat(paddingBottom));

    if (delta > 0) menuDom.style.top = -delta + 'px';
    else menuDom.style.top = '0px';
  });

  const handleEditClick = () => {
    setShowMenu(false);
    onEditClick(id);
  };

  return (
    <>
      <li className={s.name}>
        <span className={s.nameValue}
              data-cy="contact-name"
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

      <li className={s.options} ref={option}>
        <Options width={25}
                 height={25}
                 data-cy="options"
                 onClick={() => setShowMenu(!showMenu)} />
        { showMenu && (
          <ul className={s.optionList} ref={menu}>
            <li className={s.option} onClick={handleEditClick}>Редактировать</li>
            <li className={s.option} onClick={() => onRemoveClick(id)}>Удалить</li>
          </ul>
        ) }
      </li>
    </>
  );
};
