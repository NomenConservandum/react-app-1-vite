import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import type { RootState } from "../store/store";
import { routes } from "../routes";
import { checkAuth } from "../store/user/thunks";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

export const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInit, setIsInit] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  
  const isAuth = useSelector((state: RootState) => state.user.isAuth);

  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    const init = async () => {
      if (localStorage.getItem('token')) {
        await dispatch(checkAuth());
      }
      setIsInit(true);
    };
    init();
  }, []);

  if (!isInit) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const route = routes.find(r => r.path === location.pathname);

  if (route?.isPrivate && !isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (route?.isUnAuth && isAuth) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};