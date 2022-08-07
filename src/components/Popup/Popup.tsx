import React, { useEffect, useRef } from 'react';
import { Button } from '../';
import { Close } from '../../assets/icons';

import s from './Popup.module.css';

type Props = {
  children: React.ReactNode
  title: string
  okIsDisabled?: boolean
  onAccept: (e: React.FormEvent<HTMLFormElement>) => void
  onCancel: () => void
};

// You should insert Popup before its siblings for proper blur.
export function Popup(x: Props) {
  const { title, children, onAccept, onCancel, okIsDisabled } = x;
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onEscapePress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };

    const catchFocus = (e: FocusEvent) => {
      if (!ref.current) return;
      if (!(e.target instanceof Node)) return;
      if (!ref.current.contains(e.target)) ref.current.focus();
    };

    document.addEventListener('keydown', onEscapePress);
    document.addEventListener('focusin', catchFocus);

    if (ref.current) {
      ref.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', onEscapePress);
      document.removeEventListener('focusin', catchFocus);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onAccept(e);
    e.preventDefault();
  };

  return (
    <div className={s.substrate}>
      <form className={s.popup} ref={ref} tabIndex={1} onSubmit={handleSubmit}>
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
          <Button className={s.okBtn}
                  type="submit"
                  disabled={okIsDisabled}>
            OK
          </Button>

          <Button className={s.cancelBtn}
                  onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </form>

    </div>
  );
}
