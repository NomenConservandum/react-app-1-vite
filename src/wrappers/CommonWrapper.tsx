// src/wrappers/CommonWrapper.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { setError } from '../store/settingsSlice';
import { CircularProgress, Snackbar, Alert, Backdrop } from '@mui/material';

export const CommonWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.settings);

  const handleCloseError = () => {
    dispatch(setError(null));
  };

  return (
    <>
      {children}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};