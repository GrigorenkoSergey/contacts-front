import React, { useEffect } from 'react';
import { Button } from '../';
import { Close } from '../../assets/icons';

import s from './Popup.module.css';

type Props = {
  children: React.ReactNode
  title: string
  onAccept: () => void
  onCancel: () => void
};

// You should insert Popup before its siblings for proper blur.
export function Popup(x: Props) {
  const { title, children, onAccept, onCancel } = x;

  useEffect(() => {
    const onEscapePress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };

    document.addEventListener('keydown', onEscapePress);

    return () => {
      document.removeEventListener('keydown', onEscapePress);
    };
  }, []);

  return (
    <div className={s.substrate}>
      <div className={s.popup}>
        <div className={s.header}>
          <h3 className={s.title}>{ title }</h3>
          <Close width={25}
                 className={s.closeBtn}
                 onClick={onCancel} />
        </div>

        <div className={s.content}>
          { children }
        </div>

        <div className={s.footer}>
          <Button className={s.okBtn} onClick={onAccept}>OK</Button>
          <Button className={s.cancelBtn} onClick={onCancel}>Отмена</Button>
        </div>
      </div>

    </div>
  );
}
