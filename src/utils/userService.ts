// src/utils/userService.ts
import api from './api';
import type { User } from '../types/api';

export const userService = {
  // Получение данных текущего авторизованного пользователя
  getMyProfile: async (): Promise<User> => {
    const response = await api.get<User>('/api/User/myprofile');
    return response.data;
  }
};