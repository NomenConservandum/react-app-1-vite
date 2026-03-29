import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { authService } from '../utils/authService';
import { CustomInput } from '../ui/CustomInput';
import { CustomButton } from '../ui/CustomButton';
import { Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await authService.login({ email, password });
      dispatch(setUser(userData.user)); // Сохраняем пользователя в Store 
      navigate('/profile'); // Переход в личный кабинет 
    } catch (err) {
      // Ошибка ловится глобально [cite: 13]
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Вход в систему</Typography>
        <form onSubmit={handleLogin}>
          <CustomInput 
            label="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <CustomInput 
            label="Пароль" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <CustomButton 
            type="submit" 
            fullWidth 
            sx={{ mt: 2 }}
            tooltipText="Войти в личный кабинет"
          >
            Войти
          </CustomButton>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
        Нет аккаунта? <a href="/register" style={{ color: '#1976d2' }}>Зарегистрироваться</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;