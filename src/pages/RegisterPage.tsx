import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { CustomInput } from '../ui/CustomInput';
import { CustomButton } from '../ui/CustomButton';
import { authService } from '../utils/authService';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      navigate('/login');
    } catch (e) {
      // Ошибка обработается автоматически интерцептором в api.ts [cite: 13]
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Регистрация</Typography>
        <form onSubmit={handleSubmit}>
          <CustomInput 
            label="Имя" 
            onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
          />
          <CustomInput 
            label="Фамилия" 
            onChange={(e) => setFormData({...formData, secondName: e.target.value})} 
          />
          <CustomInput 
            label="Email" 
            type="email" 
            required 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          <CustomInput 
            label="Пароль" 
            type="password" 
            required 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
          />
          <CustomButton 
            type="submit" 
            fullWidth 
            sx={{ mt: 3 }}
            tooltipText="Нажмите, чтобы создать аккаунт"
          >
            Зарегистрироваться
          </CustomButton>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
        Уже есть аккаунт? <a href="/login" style={{ color: '#1976d2' }}>Войти</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;