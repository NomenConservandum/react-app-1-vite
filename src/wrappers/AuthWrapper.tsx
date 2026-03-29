// src/wrappers/AuthWrapper.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from "../store/store";

export const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};