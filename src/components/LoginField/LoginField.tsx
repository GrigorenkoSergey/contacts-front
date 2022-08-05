import React from 'react';
import { Field } from '../Field';

type Props = {
  value: string
  onChange(v: string): void
  className?: string
  invalid?: boolean
};

export function LoginField(x: Props) {
  const { onChange, invalid, value, className } = x;

  return (
    <Field className={className}
           type="text"
           placeholder="Логин"
           errorMessage="Неверный логин"
           autoComplite="username"
           dataCy='login'
           invalid={invalid}
           value={value}
           onChange={onChange} />
  );
}
