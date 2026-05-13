import React from 'react';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import QuotesListPage from "./pages/QuotesListPage";
import RandomQuotePage from "./pages/RandomQuotePage";
import CreateQuotePage from "./pages/CreateQuotePage";

export interface IRoute {
  path: string;
  label: string;
  element: React.ReactNode;
  isPrivate?: boolean; // Флаг для удобства фильтрации в меню
  isUnAuth?: boolean; // Флаг для страниц, которые должен видеть лишь неавторизированный пользователь
}

export const routes: IRoute[] = [
  // Публичные страницы
  { 
    path: "/", 
    label: "Главная", 
    element: <LandingPage />,
    isUnAuth: true,
  },
  { 
    path: "/login", 
    label: "Вход", 
    element: <LoginPage />,
    isUnAuth: true,
  },
  { 
    path: "/register", 
    label: "Регистрация", 
    element: <RegisterPage />,
    isUnAuth: true,
  },

  // Защищенные страницы (Доступны только после логина)
  { 
    path: "/profile", 
    label: "Профиль", 
    element: <ProfilePage />,
    isPrivate: true 
  },

  // --- Разделы Цитат (Вместо единого DataPage) ---
  { 
    path: "/quotes", 
    label: "Лента цитат", 
    element: <QuotesListPage />,
    isPrivate: true 
  },
  { 
    path: "/quotes/random", 
    label: "Случайная мысль", 
    element: <RandomQuotePage />,
    isPrivate: true 
  },
  { 
    path: "/quotes/create", 
    label: "Добавить свою", 
    element: <CreateQuotePage />,
    isPrivate: true 
  },
];