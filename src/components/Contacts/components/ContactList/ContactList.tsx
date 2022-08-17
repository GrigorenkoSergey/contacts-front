import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Add } from '../../../../assets/icons';
import { contacts } from '../../../../store';
import { cn } from '../../../../utils';
import { ContactItem } from './ContactItem';

import s from './ContactList.module.scss';

type Popup = 'edit' | 'info' | 'add' | 'delete';

type Props = {
  list: typeof contacts.contacts[number][]
  setPopup: (w: Popup) => void
};

export const ContactList = observer((x: Props) => {
  const { list, setPopup } = x;
  const ref = useRef<HTMLUListElement>(null);

  const handleNameClick = (id: number) => {
    contacts.selectedId = id;
    setPopup('info');
  };

  const handleEditClick = (id: number) => {
    contacts.selectedId = id;
    setPopup('edit');
  };

  const handleRemoveClick = (id: number) => {
    contacts.selectedId = id;
    setPopup('delete');
  };

  return (
    <ul className={s.list} ref={ref} data-cy="contact-list">
      <li className={s.listHeader}>№</li>
      <li className={s.listHeader}>Имя</li>
      <li className={s.listHeader}>Телефон</li>
      <li className={s.listHeader}>Email</li>

      <li className={cn(s.listHeader, s.add)} onClick={() => setPopup('add')}>
        <Add width={20}
             data-cy="add"
             className={s.addIcon} />
      </li>
      <>
        { !list.length && <span className={s.emptyContacts}>Нет контактов...</span> }
        { list.length > 0 && list.map((c, i) => (
          <React.Fragment key={c.id}>
            <li className={s.number}>{ i + 1 }</li>
            <ContactItem contact={c}
                         parentRef={ref}
                         onRemoveClick={handleRemoveClick}
                         onNameClick={() => handleNameClick(c.id)}
                         onEditClick={handleEditClick} />
          </React.Fragment>
        )) }
      </>
    </ul>
  );
});
