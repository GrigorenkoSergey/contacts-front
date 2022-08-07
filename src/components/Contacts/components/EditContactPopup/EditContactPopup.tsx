import React, { useState } from 'react';
import { contacts } from '../../../../store';
import { Popup } from '../../..';
import s from './EditContactPopup.module.css';

type Props = {
  onAccept: () => void
  onCancel: () => void
};

const fields = ['name', 'phone', 'email', 'notes'] as const;
const inputTypeMapper = { name: 'text', email: 'email', phone: 'number', notes: 'text' };

export const EditContactPopup = (x: Props) => {
  const currentItem = contacts.contacts.find(i => i.id === contacts.editingId);

  const [name, setName] = useState(currentItem?.name);
  const [email, setEmail] = useState(currentItem?.email);
  const [phone, setPhone] = useState(currentItem?.phone);
  const [notes, setNotes] = useState(currentItem?.notes);
  const [error, setError] = useState('');

  if (!currentItem) return null;

  const valueMapper = { name, email, phone, notes };

  const handleAcceptClick = (e: React.FormEvent<HTMLFormElement>) => {
    if (error) return setError('');

    const existingContact = contacts.contacts.find(c =>
      c.name === name
      && c.id !== currentItem.id
      && (c.email === email || c.phone === phone)
    );

    if (existingContact) return setError('Изменения совпадают с уже существующим контактом!');

    x.onAccept();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: typeof fields[number]) => {
    const value = e.target.value;

    const setMapper: {[key in typeof fields[number]]: (v: string) => void} = {
      name: setName,
      email: setEmail,
      phone: setPhone,
      notes: setNotes
    };
    setMapper[field](value);
  };

  const okIsEnabled = name && (email || phone) && (
    name !== currentItem.name
    || email !== currentItem.email
    || phone !== currentItem.phone
    || notes !== currentItem.notes
  );

  return (
    <Popup title="Редактирование..."
           okIsDisabled={!okIsEnabled}
           onAccept={handleAcceptClick}
           onCancel={x.onCancel}>
      { error && error }

      { !error && (
        <div className={s.content}>
          { ['Имя', 'Телефон', 'Почта'].map((el, i) => (
            <React.Fragment key={i}>
              <span className={s.title}>{ el }</span>
              <input className={s.input}
                     required={fields[i] === 'name'}
                     name={fields[i]}
                     type={inputTypeMapper[fields[i]]}
                     value={valueMapper[fields[i]]}
                     onChange={e => handleChange(e, fields[i])} />
            </React.Fragment>
          )) }

          <span className={s.title}>Заметки</span>
          <textarea name="notes" cols={30} rows={5} className={s.notes}></textarea>
        </div>
      ) }
    </Popup>
  );
};
