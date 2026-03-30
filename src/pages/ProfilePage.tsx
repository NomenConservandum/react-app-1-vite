import React from 'react';
import { 
  Container, Grid, Paper, Typography, Box, Avatar, 
  Card, CardActionArea, CardContent, Divider 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  MenuBook, 
  AutoFixHigh, 
  AddCircleOutline, 
  Logout 
} from '@mui/icons-material';

import { logout } from '../store/user/userSlice';
import type { RootState } from '../store/store';
import { CustomButton } from '../ui/CustomButton';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Данные для плиток навигации
  const menuItems = [
    {
      title: 'Лента цитат',
      description: 'Читать мысли других пользователей',
      path: '/quotes',
      icon: <MenuBook fontSize="large" color="primary" />,
      color: '#e3f2fd'
    },
    {
      title: 'Случайная мысль',
      description: 'Получить порцию вдохновения',
      path: '/quotes/random',
      icon: <AutoFixHigh fontSize="large" color="secondary" />,
      color: '#f3e5f5'
    },
    {
      title: 'Добавить свою',
      description: 'Поделиться своей мудростью',
      path: '/quotes/create',
      icon: <AddCircleOutline fontSize="large" sx={{ color: '#2e7d32' }} />,
      color: '#e8f5e9'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      {/* Шапка профиля */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mb: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar 
            sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main', fontSize: '2rem' }}
          >
            {user?.userName?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            {user?.userName || 'Пользователь'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {user?.email || 'email@example.com'}
          </Typography>
          <CustomButton 
            variant="outlined" 
            color="error" 
            startIcon={<Logout />} 
            onClick={handleLogout}
          >
            Выйти из системы
          </CustomButton>
        </Box>
      </Paper>

      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Управление контентом
      </Typography>

      {/* Плиточное меню (Dashboard) */}
      <Grid container spacing={3}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card 
              elevation={2} 
              sx={{ 
                borderRadius: 4, 
                transition: '0.3s', 
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } 
              }}
            >
              <CardActionArea onClick={() => navigate(item.path)} sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box 
                    sx={{ 
                      display: 'inline-flex', 
                      p: 2, 
                      borderRadius: '50%', 
                      bgcolor: item.color, 
                      mb: 2 
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 6 }} />

      {/* Статистика или доп. инфо (заглушка) */}
      <Box sx={{ p: 3, bgcolor: 'action.hover', borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Вы с нами с 2026 года. Опубликовано цитат: 12
        </Typography>
      </Box>
    </Container>
  );
};

export default ProfilePage;