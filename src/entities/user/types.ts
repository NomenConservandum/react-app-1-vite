// src/entities/user/types.ts
export interface User {
  id: number;
  firstName: string | null;
  secondName: string | null;
  email: string | null;
}

export interface AuthResponse {
  user: User | null;
  accessToken: string;
  refreshToken?: string; // Если бэк поддерживает
}