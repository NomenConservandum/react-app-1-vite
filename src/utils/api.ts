// src/utils/api.ts
import axios from 'axios';
import { store } from '../store/store';
import { setLoading, setError } from '../store/settingsSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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

api.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false));
    return response;
  },
  (error) => {
    store.dispatch(setLoading(false));

    let errorMessage = 'Произошла непредвиденная ошибка';

    if (error.response) {
      // Сервер ответил с кодом ошибки (4xx, 5xx)
      const data = error.response.data;
      const status = error.response.status;

      // Извлекаем сообщение из тела ответа (ProblemDetails в Swagger)
      // Проверяем разные варианты полей, которые может прислать бэк
      errorMessage = data.detail || data.title || data.message || `Ошибка сервера (${status})`;

      if (status === 401) {
        // Добавляем специфику для 401
        errorMessage = 'Сессия истекла: ' + (data.detail || 'авторизуйтесь заново');
        // Здесь можно вызвать store.dispatch(logout()) если нужно
      }
      
      console.error(`[API Error ${status}]:`, data); // Для отладки в консоли
    } else if (error.request) {
      // Запрос был отправлен, но ответ не получен (проблемы с сетью)
      errorMessage = 'Сервер не отвечает. Проверьте подключение к сети.';
    } else {
      // Ошибка при настройке запроса
      errorMessage = error.message;
    }

    store.dispatch(setError(errorMessage));
    return Promise.reject(error);
  }
);

export default api;