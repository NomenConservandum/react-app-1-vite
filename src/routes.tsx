import React from 'react';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import DataPage from "./pages/DataPage";

import MoviesPage from "./pages/MoviesPage";
import GenresPage from "./pages/GenresPage";
import DirectorsPage from "./pages/DirectorsPage";

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
  { 
    path: "/quotes", 
    label: "Цитаты", 
    element: <AuthWrapper><DataPage /></AuthWrapper>,
    isPrivate: true 
  },

  // --- 3 Уникальные страницы (согласно ТЗ) ---
  { 
    path: "/movies", 
    label: "Фильмы", 
    element: <AuthWrapper><MoviesPage /></AuthWrapper>,
    isPrivate: true 
  },
  { 
    path: "/genres", 
    label: "Жанры", 
    element: <AuthWrapper><GenresPage /></AuthWrapper>,
    isPrivate: true 
  },
  { 
    path: "/directors", 
    label: "Режиссеры", 
    element: <AuthWrapper><DirectorsPage /></AuthWrapper>,
    isPrivate: true 
  },
];