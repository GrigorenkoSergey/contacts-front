import React, { useRef, useState } from 'react';
import { contacts } from '../../../../store';
import { Popup } from '../../../';
import s from './ContactPopup.module.scss';

type PopupType = 'edit' | 'info' | 'add';

type Props = {
  onAccept: () => void
  onCancel: () => void
  type: PopupType
};

const fields = ['name', 'phone', 'email', 'notes'] as const;
const inputTypeMapper = { name: 'text', email: 'email', phone: 'number', notes: 'text' };

const titleMapper: Record<PopupType, string> = {
  add: 'Добавление..',
  edit: 'Редактирование..',
  info: 'О контакте'
};

export const ContactPopup = (x: Props) => {
  const { type, onAccept, onCancel } = x;

  const currentItem = contacts.contacts.find(i => i.id === contacts.selectedId);
  const {
    email: emailSaved = '',
    name: nameSaved = '',
    notes: notesSaved = '',
    phone: phoneSaved = ''
  } = currentItem || {};

  const [startInfo] = useState({ email: emailSaved, name: nameSaved, notes: notesSaved, phone: phoneSaved });
  const currentInfo = useRef({ email: emailSaved, name: nameSaved, notes: notesSaved, phone: phoneSaved }).current;
  const [okIsEnabled, setOkIsEnable] = useState(type === 'info' ? true : false);
  const [error, setError] = useState('');

  const handleAcceptClick = () => {
    if (type === 'info') return onAccept();
    if (error) return setError('');

    const { email, name, notes, phone } = currentInfo;
    const result = contacts[type === 'add' ? 'createContact' : 'updateContact']({ name, email, phone, notes, id: contacts.selectedId });
    if (typeof result !== 'number') return setError(result.error);

    onAccept();
  };

  const handleCancelClick = () => {
    if (!error) contacts.selectedId = 0;
    onCancel();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: typeof fields[number]
  ) => {
    const value = e.target.value;
    currentInfo[field] = value;

    const { email, name, notes, phone } = currentInfo;
    const { name: oldName, email: oldEmail, phone: oldPhone, notes: oldNotes, } = startInfo;

    const okIsEnabledLocal
      = type === 'add'
        ? Boolean(name && (email || phone))
        : name !== oldName || email !== oldEmail || notes !== oldNotes || phone !== oldPhone;

    if (okIsEnabledLocal !== okIsEnabled) setOkIsEnable(okIsEnabledLocal);
  };

  return (
    <Popup title={titleMapper[type]}
           onAccept={handleAcceptClick}
           okIsDisabled={!okIsEnabled}
           hideControls={type === 'info'}
           onCancel={handleCancelClick}>
      { error && error }

      { !error && (
        <div className={s.content}>
          { ['Имя', 'Телефон', 'Почта'].map((el, i) => (
            <React.Fragment key={i}>
              <span className={s.title}>{ el }</span>
              <input className={s.input}
                     name={fields[i]}
                     type={inputTypeMapper[fields[i]]}
                     defaultValue={currentInfo[fields[i]]}
                     readOnly={type === 'info'}
                     onChange={e => handleChange(e, fields[i])} />
            </React.Fragment>
          )) }

          <span className={s.title}>Заметки</span>
          <textarea name="notes"
                    className={s.notes}
                    rows={5}
                    readOnly={type === 'info'}
                    defaultValue={currentInfo.notes}
                    onChange={e => handleChange(e, 'notes')}></textarea>
        </div>
      ) }

    </Popup>
  );
};
