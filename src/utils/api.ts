// src/utils/api.ts
import axios from 'axios';
import { store } from '../store/store';
import { setLoading, setError } from '../store/settingsSlice';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  store.dispatch(setLoading(true));
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  store.dispatch(setLoading(false));
  store.dispatch(setError(error.message || 'Ошибка сети'));
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  store.dispatch(setLoading(false));
  return response;
}, (error) => {
  store.dispatch(setLoading(false));
  // Обработка статус-кодов
  const status = error.response?.status;
  if (status === 401) {
    store.dispatch(setError('Сессия истекла. Пожалуйста, авторизуйтесь заново.'));
    // Можно добавить логику логаута
  } else if (status >= 500) {
    store.dispatch(setError('Внутренняя ошибка сервера.'));
  } else {
    store.dispatch(setError(error.response?.data?.title || 'Произошла ошибка'));
  }
  return Promise.reject(error);
});

export default api;