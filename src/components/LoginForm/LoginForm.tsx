import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../../utils';
import { LoginField, Button, PasswordField } from '../';
import { auth } from '../../store';
import s from './LoginForm.module.scss';

type Props = {
  className?: string
};

export function LoginForm(x: Props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await auth.login(login, password);

    if ('data' in result) return navigate('/contacts', { replace: true });

    const { error } = result;
    setLoginError(/login/i.test(error));
    setPasswordError(/password/i.test(error));
  };

  return (
    <form className={cn(s.form, x.className)}
          name="auth"
          onSubmit={handleSubmit}>
      <h2 className={s.title}>Войти</h2>

      <LoginField className={s.login}
                  value={login}
                  name="login"
                  invalid={loginError}
                  onChange={setLogin} />
      <PasswordField className={s.password}
                     value={password}
                     invalid={passwordError}
                     name="password"
                     onChange={setPassword} />
      <Button type="submit"
              disabled={!login || !password}>
        Войти
      </Button>

      <p className={s.footer}>
        Новичок?&nbsp;
        <Link to="sign-up">Регистрируйся!!</Link>
      </p>
    </form>
  );
}
