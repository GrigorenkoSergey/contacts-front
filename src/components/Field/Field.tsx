import React from 'react';
import { User } from '../../assets/icons';
import { cn } from '../../utils';

import s from './Field.module.scss';

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
};

export function Field(x: Props) {
  const {
    placeholder, icon, type, className, name, value, invalid, errorMessage,
    autoComplite, disabled, onChange, onIconClick
  } = x;

  const Icon = icon ?? User;

  const handleIconClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    onIconClick?.();
    e.preventDefault();
  };

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
               disabled={disabled}
               autoComplete={autoComplite} />

        <Icon className={s.icon}
              onClick={handleIconClick} />
      </label>

      { invalid && <span className={s.errorMessage}>{ errorMessage }</span> }
    </fieldset>
  );
}
