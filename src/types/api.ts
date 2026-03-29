// src/types/api.ts

export interface User {
  id: number;
  firstName: string | null;
  secondName: string | null;
  email: string | null;
  password?: string | null;
}

// ВАЖНО: Проверьте наличие 'export' здесь
export type RegisterUserData = Omit<User, 'id'>; 

export interface LoginUser {
  email: string | null;
  password?: string | null;
}

export interface ProblemDetails {
  type: string | null;
  title: string | null;
  status: number | null;
  detail: string | null;
  instance: string | null;
}