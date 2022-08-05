import React, { useState } from 'react';
import { cn } from '../../utils';
import { LoginField } from '../LoginField';
import { PasswordField } from '../PasswordField';
import s from './LoginForm.module.css';

type Props = {
  className?: string
};

export function LoginForm(x: Props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={cn(s.form, x.className)}>
      <LoginField className={s.login}
                  value={login}
                  onChange={setLogin} />
      <PasswordField className={s.password}
                     value={password}
                     onChange={setPassword} />
    </form>
  );
}
