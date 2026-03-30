import React from 'react';
import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

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

