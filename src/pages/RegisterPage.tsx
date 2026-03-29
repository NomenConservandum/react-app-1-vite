import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomInput } from '../ui/CustomInput';
import { CustomButton } from '../ui/CustomButton';
import { registerUser } from '../store/user/thunks';
import type { AppDispatch, RootState } from '../store/store';

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.settings);

  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData)).unwrap();
      // После успешной регистрации отправляем на логин
      navigate('/login');
    } catch (err) {
      // Обработка ошибки
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Регистрация</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <CustomInput 
            label="Имя" 
            onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
            disabled={isLoading}
          />
          <CustomInput 
            label="Фамилия" 
            onChange={(e) => setFormData({...formData, secondName: e.target.value})} 
            disabled={isLoading}
          />
          <CustomInput 
            label="Email" 
            type="email"
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            disabled={isLoading}
          />
          <CustomInput 
            label="Пароль" 
            type="password"
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            disabled={isLoading}
          />
          <CustomButton 
            type="submit" 
            fullWidth 
            sx={{ mt: 3 }}
            disabled={isLoading}
            tooltipText="Создать аккаунт"
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </CustomButton>
          
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Уже есть аккаунт? <CustomButton variant="text" onClick={() => navigate('/login')}>Войти</CustomButton>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;