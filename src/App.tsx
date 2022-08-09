import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LoginForm, RegisterForm, Contacts } from './components';
import s from './App.module.scss';

export function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/contacts', { replace: true });
  }, []);

  return (
    <div className={s.app}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/sign-up" element={<RegisterForm />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}
