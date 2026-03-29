// src/utils/authService.ts
import api from './api';
import { User, LoginUser, RegisterUserData } from '../types/api';

export const authService = {
  // Теперь типизация корректна: id не требуется для отправки [cite: 7, 14]
  register: async (data: RegisterUserData): Promise<void> => {
    await api.post('/api/Auth/Registration', data);
  },

  login: async (data: LoginUser): Promise<any> => {
    const response = await api.post('/api/Auth/Login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }
};