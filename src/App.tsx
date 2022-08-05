import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginForm, RegisterForm } from './components';
import s from './App.module.css';

export function App() {
  return (
    <div className={s.app}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/sign-up" element={<RegisterForm />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}
