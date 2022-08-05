import React from 'react';
import { Field } from '../Field';

type Props = {
  value: string
  name?: string
  onChange(v: string): void
  className?: string
  invalid?: boolean
};

export function LoginField(x: Props) {
  const { onChange, invalid, value, className, name } = x;

  return (
    <Field className={className}
           type="text"
           placeholder="Логин"
           errorMessage="Неверный логин"
           autoComplite="username"
           invalid={invalid}
           value={value}
           name={name}
           onChange={onChange} />
  );
}
