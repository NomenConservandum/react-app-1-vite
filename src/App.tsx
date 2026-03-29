// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CommonWrapper } from './wrappers/CommonWrapper';
import { AuthWrapper } from './wrappers/AuthWrapper';

// Заглушки страниц (их нужно будет создать в папке src/pages/)
const LandingPage = () => <div>Лендинг</div>;
const LoginPage = () => <div>Авторизация</div>;
const RegisterPage = () => <div>Регистрация</div>;
const ProfilePage = () => <div>Личный кабинет</div>;
const DataPage = () => <div>Данные после авторизации (Цитаты)</div>;
const NotFoundPage = () => <div>404: Страница не найдена. <a href="/">На главную</a></div>;

function App() {
  return (
    <BrowserRouter>
      <CommonWrapper>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Защищенные маршруты */}
          <Route path="/profile" element={
            <AuthWrapper>
              <ProfilePage />
            </AuthWrapper>
          } />
          <Route path="/quotes" element={
            <AuthWrapper>
              <DataPage />
            </AuthWrapper>
          } />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CommonWrapper>
    </BrowserRouter>
  );
}

export default App;