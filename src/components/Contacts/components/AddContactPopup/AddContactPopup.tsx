import React, { useState } from 'react';
import { Popup } from '../../..';
import { contacts } from '../../../../store';
import s from './AddContactPopup.module.css';

type Props = {
  onAccept: () => void
  onCancel: () => void
};

const fields = ['name', 'phone', 'email', 'notes'] as const;

export const AddContactPopup = (x: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleAcceptClick = (e: React.FormEvent<HTMLFormElement>) => {
    if (error) return setError('');

    const contactIsExists = contacts.contacts.find(c =>
      c.name === name && (
        (email ? c.email === email : false)
         || (phone ? c.phone === phone : false)
      ));

    if (contactIsExists) return setError('Текущий контакт уже существует!');

    contacts.createContact({ name, email, phone, notes });
    x.onAccept();
  };

  const valueMapper = { name, email, phone, notes };
  const inputTypeMapper = { name: 'text', email: 'email', phone: 'number', notes: 'text' };

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

  const okIsEnabled = name && (email || phone);

  return (
    <Popup title="Добавление..."
           onAccept={handleAcceptClick}
           okIsDisabled={!okIsEnabled}
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
