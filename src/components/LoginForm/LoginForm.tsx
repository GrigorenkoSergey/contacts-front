import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils';
import { LoginField, Button, PasswordField } from '../';
import s from './LoginForm.module.scss';

type Props = {
  className?: string
};

export function LoginForm(x: Props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={cn(s.form, x.className)}
          name="auth"
          onSubmit={e => e.preventDefault()}>
      <h2 className={s.title}>Войти</h2>

      <LoginField className={s.login}
                  value={login}
                  name="login"
                  onChange={setLogin} />
      <PasswordField className={s.password}
                     value={password}
                     name="password"
                     onChange={setPassword} />
      <Button>Войти</Button>

      <p className={s.footer}>
        Новичок?&nbsp;
        <Link to="sign-up">Регистрируйся!!</Link>
      </p>
    </form>
  );
}
