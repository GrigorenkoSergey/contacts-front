import React from 'react';
import { Popup } from '../..';
import { contacts } from '../../../store';
import s from './ContactPopup.module.css';

type Props = {
  onAccept: () => void
  onCancel: () => void
};

const fields = ['name', 'phone', 'email', 'notes'] as const;
const inputTypeMapper = { name: 'text', email: 'email', phone: 'number', notes: 'text' };

export const ContactInfoPopup = (x: Props) => {
  const currentItem = contacts.contacts.find(i => i.id === contacts.selectedId);
  if (!currentItem) return null;

  const { email, name, notes, phone } = currentItem;
  const valueMapper = { email, name, notes, phone };

  return (
    <Popup title="Добавление..."
           onAccept={x.onAccept}
           hideControls={true}
           onCancel={x.onCancel}>

      <div className={s.content}>
        { ['Имя', 'Телефон', 'Почта'].map((el, i) => (
          <React.Fragment key={i}>
            <span className={s.title}>{ el }</span>
            <input className={s.input}
                   name={fields[i]}
                   type={inputTypeMapper[fields[i]]}
                   readOnly={true}
                   value={valueMapper[fields[i]]} />
          </React.Fragment>
        )) }

        <span className={s.title}>Заметки</span>
        <textarea name="notes"
                  cols={30}
                  rows={5}
                  value={valueMapper.notes}
                  className={s.notes}
                  readOnly={true}></textarea>
      </div>
    </Popup>
  );
};
