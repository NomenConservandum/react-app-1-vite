import axios from 'axios';
import { store } from '../store/store';
import { setLoading, setError } from '../store/settingsSlice';
import { logout } from '../store/user/userSlice';
import type { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Добавляем accessToken в каждый запрос
api.interceptors.request.use((config) => {
  store.dispatch(setLoading(true));
  const tokenData = localStorage.getItem('token');
  
  if (tokenData) {
    try {
      const { accessToken } = JSON.parse(tokenData);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (e) {
      console.error("Ошибка парсинга токена из localStorage", e);
    }
  }
  return config;
}, (error) => {
  store.dispatch(setLoading(false));
  return Promise.reject(error);
});

// Перехват 401 ошибки и Refresh Token
api.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false));
    return response;
  },
  async (error) => {
    store.dispatch(setLoading(false));
    const originalRequest = error.config;

    // Проверяем: ошибка 401 и мы еще не пытались обновить токен для этого запроса
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokenData = localStorage.getItem('token');

      if (tokenData) {
        try {
          const { refreshToken } = JSON.parse(tokenData);

          // Запрос на обновление (используем напрямую через axios, чтобы избежать цикла)
          // А то была у меня практика цикла на мобильном приложении, запускалось много
          // Экземпляров одной и той же страницы, приложение висло, и было не круто
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/Auth/Refresh`, {
            refreshToken
          });

          // Сохраняем новую пару (accessToken + refreshToken)
          localStorage.setItem('token', JSON.stringify(response.data));

          // Повторяем запрос с новым токеном
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Если Refresh Token тоже протух, то выходим из профиля
          localStorage.removeItem('token');
          store.dispatch(logout());
          store.dispatch(setError("Сессия истекла, войдите заново"));
          return Promise.reject(refreshError);
        }
      }
    }

    // Обработка остальных ошибок
    const data = error.response?.data;
    const errorMessage = data?.detail || data?.message || error.message;
    
    // Не спамим ошибкой, если мы в процессе рефреша
    if (error.response?.status !== 401) {
      store.dispatch(setError(errorMessage));
    }

    return Promise.reject(error);
  }
);

export default api;