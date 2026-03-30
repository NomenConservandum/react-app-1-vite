import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Box, 
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/user/userSlice';
import { CustomButton } from '../ui/CustomButton';
import api from '../utils/api';
import type { RootState } from '../store/store';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Состояния для полей ввода
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Глобальное состояние загрузки из настроек
  const { isLoading } = useSelector((state: RootState) => state.settings);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      // ОТПРАВЛЯЕМ ТОЛЬКО ТЕ ПОЛЯ, КОТОРЫЕ ЖДЕТ БЭКЕНД
      const response = await api.post('/api/Auth/Login', {
        email: email,
        password: password
      });

      // Сохраняем полученный JSON (токены + инфо)
      localStorage.setItem('token', JSON.stringify(response.data));

      // Обновляем Redux
      // ВАЖНО: Если бэкенд присылает данные пользователя прямо в корне response.data, 
      // используй response.data. Если в объекте user — response.data.user
      dispatch(setUser({ 
        user: response.data.user || response.data, 
        accessToken: response.data.accessToken 
      }));

      // Теперь редирект должен сработать
      navigate('/profile');

    } catch (err: any) {
      setLocalError(err.response?.data?.message || 'Неверный email или пароль');
      console.error('Login error:', err);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <LoginIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Вход
          </Typography>
        </Box>

        {localError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {localError}
          </Alert>
        )}

        {/* ПРИВЯЗЫВАЕМ ФУНКЦИЮ К ONSUBMIT ФОРМЫ */}
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Электронная почта"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />

          <TextField
            fullWidth
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <CustomButton
            type="submit" // КРИТИЧНО для работы onSubmit
            fullWidth
            size="large"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'Входим...' : 'Войти'}
          </CustomButton>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Нет аккаунта?{' '}
              <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Зарегистрироваться
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;