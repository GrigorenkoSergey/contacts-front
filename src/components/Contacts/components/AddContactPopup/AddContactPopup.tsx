import React from 'react';
import { Popup } from '../../..';
import s from './AddContactPopup.module.css';

type Props = {
  onAccept: () => void
  onCancel: () => void
};

export const AddContactPopup = (x: Props) => {
  return (
    <Popup onAccept={x.onAccept} onCancel={x.onCancel} title="Добавление...">
      <div className={s.content}>
        { ['Имя', 'Телефон', 'Почта'].map((el, i) => (
          <React.Fragment key={i}>
            <span className={s.title}>{ el }</span>
            <input type="text" className={s.input} />
          </React.Fragment>
        )) }

        <span className={s.title}>Заметки</span>
        <textarea cols={30} rows={5} className={s.notes}></textarea>
      </div>
    </Popup>
  );
};
