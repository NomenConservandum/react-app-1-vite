// src/types/api.ts
export interface User {
  id: number;
  firstName: string | null;
  secondName: string | null;
  email: string | null;
  password?: string | null; // Опционально, чтобы не светить везде
}

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