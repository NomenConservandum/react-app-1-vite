// src/ui/CustomButton.tsx
import React from 'react';
import { Button, Tooltip } from "@mui/material";
import type { ButtonProps } from "@mui/material";

// Для удобства пользователя
interface ICustomButton extends ButtonProps {
  tooltipText?: string;
}

export const CustomButton: React.FC<ICustomButton> = ({ children, tooltipText, ...props }) => {
  const button = (
    <Button variant="contained" {...props}>
      {children}
    </Button>
  );

  return tooltipText ? <Tooltip title={tooltipText}>{button}</Tooltip> : button;
};