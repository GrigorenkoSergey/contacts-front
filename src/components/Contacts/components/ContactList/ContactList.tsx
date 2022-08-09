import React from 'react';
import { observer } from 'mobx-react-lite';
import { Add, Delete } from '../../../../assets/icons';
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
      <span className={s.listHeader}>№</span>
      <span className={s.listHeader}>Имя</span>
      <span className={s.listHeader}>Телефон</span>
      <span className={s.listHeader}>Email</span>

      <div className={cn(s.listHeader, s.delete)}>
        { contacts.idsToRemove.size > 0 && ( // FIXME вынести в отдельный компонент для ускорения
          <Delete width={25}
                  className={s.deleteIcon}
                  onClick={() => setPopup('delete')} />
        ) }
      </div>

      <div className={cn(s.listHeader, s.iconWrapper)}>
        <Add width={20}
             className={s.add}
             onClick={() => setPopup('add')} />
      </div>
      <>
        { !list.length && <span className={s.emptyContacts}>Нет контактов...</span> }
        { list.length > 0 && list.map((c, i) => (
          <React.Fragment key={c.id}>
            <span className={s.number}>{ i + 1 }</span>
            <ContactItem contact={c}
                         isChecked={contacts.idsToRemove.has(c.id)}
                         onRemoveClick={() => contacts.removeSingle(c.id)}
                         onNameDoubleClick={() => handleNameDoubleClick(c.id)}
                         onEditClick={handleEditClick}
                         onSelect={e => handleItemSelect(e, c.id)} />
          </React.Fragment>
        )) }
      </>
    </div>
  );
});
