import React, { useState } from 'react';
import { EyeOff, Eye } from '../../assets/icons';
import { Field } from '../Field';

type Props = {
  value: string
  name?: string
  onChange(v: string): void
  className?: string
  invalid?: boolean
  placeholder?: string
};

export function PasswordField(x: Props) {
  const { value, name, className, invalid, placeholder, onChange, } = x;
  const [type, setType] = useState<'password' | 'text'>('password');

  return (
    <Field className={className}
           type={type}
           placeholder={placeholder ?? 'Пароль'}
           value={value}
           name={name}
           onChange={onChange}
           invalid={invalid}
           errorMessage="Неверный пароль"
           autoComplite="current-password"
           icon={type === 'password' ? EyeOff : Eye}
           onIconClick={() => setType(type === 'password' ? 'text' : 'password')} />
  );
}
