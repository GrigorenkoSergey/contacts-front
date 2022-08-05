import React from 'react';
import { User } from '../../assets/icons';
import { cn } from '../../utils';

import s from './Field.module.css';

type Props = {
  placeholder: string
  icon?: typeof User
  type: 'text' | 'password' | 'number' | 'email'
  className?: string
  value: string
  name?: string
  invalid?: boolean
  errorMessage: string
  autoComplite?: string
  disabled?: boolean

  onIconClick?: () => void
  onChange(v: string): void
  onBlur?: () => void
};

export function Field(x: Props) {
  const {
    placeholder, icon, type, className, name, value, invalid, errorMessage,
    autoComplite, disabled, onChange, onBlur, onIconClick
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
               name={name}
               placeholder={placeholder}
               value={value}
               onChange={e => onChange(e.target.value)}
               onBlur={onBlur}
               disabled={disabled}
               autoComplete={autoComplite} />

        <Icon className={s.icon} onClick={onIconClick} />
      </label>

      { invalid && <span className={s.errorMessage}>{ errorMessage }</span> }
    </fieldset>
  );
}
