import api from './api';
import type { User, LoginUser, RegisterUserData } from '../types/api';

export const authService = {
  register: async (data: RegisterUserData): Promise<void> => {
    await api.post('/api/Auth/Registration', data);
  },

  login: async (data: LoginUser): Promise<any> => {
    const response = await api.post('/api/Auth/Login', data);
    if (response.data.token) {
      localStorage.setItem('token', JSON.stringify(response.data));
    }
    return response.data;
  },

  check: async (): Promise<User> => {
    const response = await api.get<User>('/api/Auth/Check'); 
    return response.data;
  }
};