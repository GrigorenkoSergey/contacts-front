import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit, Add, User, DoorExit } from '../../assets/icons';
import { cn } from '../../utils';
import { Popup } from '../Popup';
import { contacts } from './mocks';
import s from './Contacts.module.css';

type Popup = 'exit' | 'edit' | 'delete' | 'add';

type PopupProps = {
  onAccept: () => void
  onCancel: () => void
};
const popupMapper: (x: PopupProps) => Record<Popup, JSX.Element> = x => ({
  add: <AddContact {...x} />,
  delete: <RemoveContact {...x} />,
  edit: <EditContact {...x} />,
  exit: <ConfirmExit {...x} />
});

type Props = {
  className?: string
};

export function Contacts(x: Props) {
  const [popup, setPopup] = useState<Popup>();
  const [filter, setFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredContacts = !filter
    ? contacts
    : contacts.filter(
      ({ name, email, phone }) => {
        const re = new RegExp(filter, 'i');
        return re.test(name) || re.test(email) || re.test(phone);
      }
    );

  const onAcceptMapper: Record<Popup, () => void> = {
    exit: () => {},
    delete: () => {
      console.log('delete contact');
      setPopup(undefined);
    },

    add: () => {
      console.log('add contact');
      setPopup(undefined);
    },

    edit: () => {
      console.log('edit contact');
      setPopup(undefined);
    },
  };
  const onCancel = () => setPopup(undefined);
  const onAccept = popup && onAcceptMapper[popup];

  const handleItemSelect = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) setSelectedIds([...selectedIds, id]);
    else setSelectedIds(selectedIds.filter(v => v !== id));
  };

  return (
    <div className={cn(s.contacts, x.className)}>
      { popup && onAccept && popupMapper({ onCancel, onAccept })[popup] }

      <div className={s.header}>
        <div className={cn(s.iconWrapper, s.user)}>
          <User width={30} />
        </div>
        <span className={s.userName}>Константин Констинтинопольский</span>

        <section className={s.search}>
          <input type="text"
                 className={s.searchInput}
                 value={filter}
                 onChange={e => setFilter(e.target.value)}></input>
        </section>

        <DoorExit width={25}
                  className={s.signOut}
                  onClick={() => setPopup('exit')} />
      </div>

      <div className={s.list}>

        <div className={s.row}>
          <span className={s.listHeader}>№</span>
          <span className={cn(s.listHeader, s.name)}>Имя</span>
          <span className={cn(s.listHeader, s.phone)}>Телефон</span>
          <span className={cn(s.listHeader, s.emai)}>Email</span>
          <div className={s.iconWrapper}>
            { selectedIds.length > 0 && (
              <Delete width={25}
                      className={s.delete}
                      onClick={() => setPopup('delete')} />
            ) }
          </div>
          <div className={s.iconWrapper}>
            <Add width={20}
                 className={s.add}
                 onClick={() => setPopup('add')} />
          </div>
        </div>

        <div className={s.scrollingList}>
          { filteredContacts.length === 0
            ? (
              <div className={s.row}>
                <span>Нет контактов...</span>
              </div>
            )
            : filteredContacts.map((c, i) => (
              <div className={s.row} key={c.id}>
                <span className={s.number}>{ i + 1 }</span>
                <ContactItem contact={c}
                             onSelect={e => handleItemSelect(e, c.id)}
                             onEditClick={() => setPopup('edit')} />
              </div>
            )) }

        </div>
      </div>

    </div>
  );
}

type ContactItemProps = {
  contact: typeof contacts[number]
  onEditClick: () => void
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
};

function ContactItem(x: ContactItemProps) {
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
}

function ConfirmExit(x: PopupProps) {
  const navigate = useNavigate();

  return (
    <Popup onAccept={() => navigate('/')}
           onCancel={x.onCancel}
           title="Подтвердите выход">
      Вы действительно хотите выйти?
    </Popup>
  );
}

function EditContact(x: PopupProps) {
  return (
    <Popup onAccept={x.onAccept} onCancel={x.onCancel} title="Редактирование...">
      Редактирование
    </Popup>
  );
}

function AddContact(x: PopupProps) {
  return (
    <Popup onAccept={x.onAccept} onCancel={x.onCancel} title="Добавление...">
      Добавление
    </Popup>
  );
}

function RemoveContact(x: PopupProps) {
  return (
    <Popup onAccept={x.onAccept} onCancel={x.onCancel} title="Удаление...">
      Вы действительно хотите удалить данные контакты?
    </Popup>
  );
}
