import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { LoginForm, Contacts } from './components';
import { auth } from './store';
import s from './App.module.scss';

export const App = observer(() => {
  const navigate = useNavigate();
  const isAuth = auth.checkIsAuth();
  const path = useLocation().pathname;

  useEffect(() => {
    if (path === '/' && isAuth) navigate('/contacts', { replace: true });
  }, [isAuth]);

  return (
    <div className={s.app}>
      <Routes>
        <Route path="/" element={isAuth ? <Contacts /> : <LoginForm />} />
        <Route path="/contacts" element={isAuth ? <Contacts /> : <LoginForm />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
});
