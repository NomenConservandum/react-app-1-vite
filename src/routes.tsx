import React from 'react';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import QuotesListPage from "./pages/QuotesListPage";
import RandomQuotePage from "./pages/RandomQuotePage";
import CreateQuotePage from "./pages/CreateQuotePage";

import { AuthWrapper } from "./wrappers/AuthWrapper";

export interface IRoute {
  path: string;
  label: string;
  element: React.ReactNode;
  isPrivate?: boolean; // Флаг для удобства фильтрации в меню
}

export const routes: IRoute[] = [
  // Публичные страницы
  { 
    path: "/", 
    label: "Главная", 
    element: <LandingPage /> 
  },
  { 
    path: "/login", 
    label: "Вход", 
    element: <LoginPage /> 
  },
  { 
    path: "/register", 
    label: "Регистрация", 
    element: <RegisterPage /> 
  },

  // Защищенные страницы (Доступны только после логина)
  { 
    path: "/profile", 
    label: "Профиль", 
    element: <AuthWrapper><ProfilePage /></AuthWrapper>,
    isPrivate: true 
  },

  // --- Разделы Цитат (Вместо единого DataPage) ---
  { 
    path: "/quotes", 
    label: "Лента цитат", 
    element: <AuthWrapper><QuotesListPage /></AuthWrapper>,
    isPrivate: true 
  },
  { 
    path: "/quotes/random", 
    label: "Случайная мысль", 
    element: <AuthWrapper><RandomQuotePage /></AuthWrapper>,
    isPrivate: true 
  },
  { 
    path: "/quotes/create", 
    label: "Добавить свою", 
    element: <AuthWrapper><CreateQuotePage /></AuthWrapper>,
    isPrivate: true 
  },
];