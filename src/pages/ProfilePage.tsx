import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Paper, Box, Avatar, Divider } from '@mui/material';
import type { RootState } from "../store/store";
import { setUser, logout } from '../store/user/userSlice';
import { userService } from '../utils/userService';
import { CustomButton } from '../ui/CustomButton';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Загружаем профиль, если его еще нет в сторе или для актуализации
    const loadProfile = async () => {
      try {
        const data = await userService.getMyProfile();
        dispatch(setUser(data));
      } catch (err) {
        // Ошибки (401, 500) обработает CommonWrapper через интерцептор
      }
    };

    loadProfile();
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  if (!user) return null; // Или скелетон/лоадер

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mb: 2 }}>
            {user.firstName?.[0]}{user.secondName?.[0]}
          </Avatar>
          <Typography variant="h4">Личный кабинет</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="overline" color="textSecondary">Имя и фамилия</Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {user.firstName} {user.secondName}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" color="textSecondary">Электронная почта</Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {user.email}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <CustomButton 
            fullWidth 
            onClick={() => navigate('/quotes')}
            tooltipText="Перейти к просмотру данных"
          >
            К данным
          </CustomButton>
          
          <CustomButton 
            fullWidth 
            color="error" 
            variant="outlined"
            onClick={handleLogout}
            tooltipText="Выйти из учетной записи"
          >
            Выйти
          </CustomButton>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;