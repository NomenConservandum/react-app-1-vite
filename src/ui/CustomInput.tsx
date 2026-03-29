// src/ui/CustomInput.tsx
import React from 'react';
import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

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

