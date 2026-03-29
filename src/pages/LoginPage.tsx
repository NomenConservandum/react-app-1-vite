import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomInput } from '../ui/CustomInput';
import { CustomButton } from '../ui/CustomButton';
import { login } from '../store/user/thunks';
import type { AppDispatch, RootState } from '../store/store';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Берем состояние из настроек (для лоадера)
  const { isLoading } = useSelector((state: RootState) => state.settings);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Вызываем thunk и "разворачиваем" результат
      await dispatch(login({ email, password })).unwrap();
      navigate('/profile'); 
    } catch (err) {
      // Ошибка уже записана в settingsSlice интерцептором, 
      // поэтому здесь просто прерываем выполнение
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Вход</Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
          <CustomInput 
            label="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={isLoading}
          />
          <CustomInput 
            label="Пароль" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            disabled={isLoading}
          />
          <CustomButton 
            type="submit" 
            fullWidth 
            sx={{ mt: 3 }}
            disabled={isLoading}
            tooltipText="Войти в систему"
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </CustomButton>
          
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Нет аккаунта? <CustomButton variant="text" onClick={() => navigate('/register')}>Зарегистрироваться</CustomButton>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;