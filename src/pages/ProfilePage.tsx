import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Paper, Box, Avatar, Divider, Skeleton, Alert } from '@mui/material';
import type { RootState } from "../store/store";
import { setUser, logout } from '../store/user/userSlice';
import { userService } from '../utils/userService';
import { CustomButton } from '../ui/CustomButton';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Берем данные пользователя из Redux
  const { user } = useSelector((state: RootState) => state.user);
  
  // Состояние для отслеживания процесса загрузки данных с сервера
  const [isInitialLoading, setIsInitialLoading] = useState(!user);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Запрос к API для получения данных текущего пользователя
        const data = await userService.getMyProfile();
        
        // Сохраняем полученные данные в стор. 
        // Передаем пустую строку в accessToken, так как он уже лежит в localStorage и обрабатывается интерцептором
        dispatch(setUser({ user: data, accessToken: "" })); 
      } catch (err) {
        console.error("Ошибка при загрузке профиля:", err);
        // Ошибки 401/500 будут также обработаны в CommonWrapper через интерцептор
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadProfile();
  }, [dispatch]);

  const handleLogout = () => {
    // Очищаем всё хранилище (наш JSON-объект с токенами)
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  // 1. Состояние загрузки (Скелетоны)
  if (isInitialLoading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Skeleton variant="circular" width={80} height={80} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="60%" height={40} />
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" height={100} />
        </Paper>
      </Container>
    );
  }

  // 2. Если данных нет и загрузка завершена (например, ошибка сервера)
  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="warning">Не удалось загрузить данные профиля.</Alert>
        <CustomButton onClick={() => navigate('/login')} sx={{ mt: 2 }}>
          Вернуться к входу
        </CustomButton>
      </Container>
    );
  }

  // 3. Основной интерфейс профиля
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mb: 2, fontSize: '2rem' }}>
            {/* Берем первую букву имени или юзернейма */}
            {user.firstName?.[0] || user.firstName?.[0] || 'U'}
            {user.secondName?.[0] || ''}
          </Avatar>
          <Typography variant="h4">Личный кабинет</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="overline" color="textSecondary">Имя и фамилия</Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {/* Отображаем имя/фамилию или userName, если они не заполнены */}
            {user.firstName || user.secondName 
              ? `${user.firstName || ''} ${user.secondName || ''}`.trim() 
              : user.firstName}
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
            onClick={() => navigate('/quotes')} // Меняем путь с /movies на /quotes
            tooltipText="Посмотреть случайные цитаты"
          >
            К цитатам
          </CustomButton>
          
          <CustomButton 
            fullWidth 
            color="error" 
            variant="outlined"
            onClick={handleLogout}
            tooltipText="Выйти из системы"
          >
            Выйти
          </CustomButton>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;