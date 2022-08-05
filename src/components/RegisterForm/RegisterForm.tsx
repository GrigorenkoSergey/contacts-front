import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Email } from '../../assets/icons';
import { cn } from '../../utils';
import { Button, Field, LoginField, PasswordField } from '../';

import s from './RegisterForm.module.css';

type Props = {
  className?: string
};

export function RegisterForm(x: Props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form className={cn(s.form, x.className)}
          name="sign-up"
          onSubmit={e => e.preventDefault()}>
      <h2 className={s.title}>Регистрация</h2>

      <LoginField className={s.login}
                  value={login}
                  name="login"
                  onChange={setLogin} />

      <Field type="email"
             className={s.email}
             errorMessage="invalid email"
             onChange={setEmail}
             icon={Email}
             name="email"
             value={email}
             placeholder="Email" />

      <div className={s.passwords}>
        <PasswordField className={s.password}
                       value={password}
                       name="password"
                       onChange={setPassword} />

        <PasswordField className={s.password}
                       value={confirmedPassword}
                       name="confirm-password"
                       placeholder="Подтверждение пароля"
                       onChange={setConfirmedPassword} />
      </div>

      <Button>Готово!</Button>

      <p className={s.footer}>
        Уже есть аккаунт?&nbsp;
        <Link to="/">Войти!</Link>
      </p>
    </form>
  );
}
