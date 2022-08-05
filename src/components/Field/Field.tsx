import React from 'react';
import { User } from '../../assets/icons';
import { cn } from '../../utils';

import s from './Field.module.css';

type Props = {
  placeholder: string
  icon?: typeof User
  type: 'text' | 'password' | 'number'
  className?: string
  value: string
  invalid?: boolean
  errorMessage: string
  autoComplite?: string
  disabled?: boolean
  dataCy?: string

  onIconClick?: () => void
  onChange(v: string): void
  onBlur?: () => void
};

export function Field(x: Props) {
  const {
    placeholder, icon, type, className, value, invalid, errorMessage,
    autoComplite, disabled, dataCy, onChange, onBlur, onIconClick
  } = x;

  const Icon = icon ?? User;

  return (
    <fieldset className={cn(
      s.fieldset,
      className,
      invalid && s.error)}>
      <legend className={s.legend}>{ placeholder }</legend>

      <label className={s.label}>
        <input className={s.input}
               type={type}
               placeholder={placeholder}
               value={value}
               onChange={e => onChange(e.target.value)}
               onBlur={onBlur}
               disabled={disabled}
               data-cy={dataCy}
               autoComplete={autoComplite} />

        <Icon className={s.icon} onClick={onIconClick} />
      </label>

      { invalid && <span className={s.errorMessage}>{ errorMessage }</span> }
    </fieldset>
  );
}
