import React from 'react';
import { contacts } from '../../../../store';
import { ContactItem } from './ContactItem';

import s from './ContactList.module.scss';

type Popup = 'edit' | 'info';

type Props = {
  list: typeof contacts.contacts[number][]
  setPopup: (w: Popup) => void
};

export const ContactList = (x: Props) => {
  const { list, setPopup } = x;

  const handleItemSelect = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) contacts.addToRemoval(id);
    else contacts.removeFromRemoval(id);
  };

  const handleNameDoubleClick = (id: number) => {
    contacts.selectedId = id;
    setPopup('info');
  };

  const handleEditClick = (id: number) => {
    contacts.selectedId = id;
    setPopup('edit');
  };

  return (
    <div className={s.list}>
      { /* <span className={s.listHeader}>№</span>
        <span className={cn(s.listHeader, s.name)}>Имя</span>
        <span className={cn(s.listHeader, s.phone)}>Телефон</span>
        <span className={cn(s.listHeader, s.emai)}>Email</span> */ }

      { /* <div className={cn(s.listHeader, s.iconWrapper)}>
          { contacts.idsToRemove.size > 0 && (
            <Delete width={25}
                    className={s.delete}
                    onClick={() => setPopup('delete')} />
          ) }
        </div>

        <div className={cn(s.listHeader, s.iconWrapper)}>
          <Add width={20}
               className={s.add}
               onClick={() => setPopup('add')} />
        </div> */ }
      <>
        { list.map((c, i) => (
          <React.Fragment key={c.id}>
            <span className={s.number}>{ i + 1 }</span>
            <ContactItem contact={c}
                         onNameDoubleClick={() => handleNameDoubleClick(c.id)}
                         onEditClick={handleEditClick}
                         onSelect={e => handleItemSelect(e, c.id)} />
          </React.Fragment>
        )) }
      </>
    </div>
  );
};
