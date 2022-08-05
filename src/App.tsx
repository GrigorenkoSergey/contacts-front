import React from 'react';
import s from './App.module.css';
import { LoginForm, RegisterForm } from './components';

export function App() {
  return (
    <div className={s.app}>
      { /* <LoginForm /> */ }
      <RegisterForm />
    </div>
  );
}
