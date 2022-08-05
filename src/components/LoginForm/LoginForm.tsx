import React from 'react';
import { cn } from '../../utils';
import { LoginField } from '../LoginField';
import { PasswordField } from '../PasswordField';
import s from './LoginForm.module.css';

type Props = {
  className?: string
};

export function LoginForm(x: Props) {
  return (
    <div className={cn(s.loginForm, x.className)}>
      <LoginField value='abc'
                  onChange={() => { }} />
      <PasswordField value=''
                     onChange={() => { }} />
    </div>
  );
}
