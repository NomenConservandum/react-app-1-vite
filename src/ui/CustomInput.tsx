// src/ui/CustomInput.tsx
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

// Строгая типизация пропсов 
export const CustomInput: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField 
      fullWidth 
      variant="outlined" 
      margin="normal" 
      {...props} 
    />
  );
};

