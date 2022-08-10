import React, { useEffect, useRef } from 'react';
import { Close } from '../../assets/icons';
import { Button } from '../';

import s from './Popup.module.css';

type Props = {
  children: React.ReactNode
  title: string
  okIsDisabled?: boolean
  onAccept: (e: React.FormEvent<HTMLFormElement>) => void
  onCancel: () => void
  hideControls?: boolean
};

// You should insert Popup before its siblings for proper blur.
export function Popup(x: Props) {
  const { title, children, onAccept, onCancel, okIsDisabled, hideControls } = x;
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onEscapePress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };

    const catchFocus = (e: FocusEvent) => {
      if (!form.current) return;
      if (!(e.target instanceof Node)) return;
      if (!form.current.contains(e.target)) form.current.focus();
    };

    document.addEventListener('keydown', onEscapePress);
    document.addEventListener('focusin', catchFocus);

    if (form.current) {
      form.current.focus();
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
      <form className={s.popup} ref={form} tabIndex={1} onSubmit={handleSubmit}>
        <div className={s.header}>
          <h3 className={s.title}>{ title }</h3>
          <Close width={25}
                 className={s.closeBtn}
                 onClick={onCancel} />
        </div>

        <div className={s.content}>
          { children }
        </div>

        { !hideControls && (
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
        ) }

      </form>

    </div>
  );
}
