import React, { useEffect, useState } from 'react';
import { 
  Container, Grid, Paper, Typography, Box, Avatar, 
  Card, CardActionArea, CardContent, Divider, Skeleton 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  MenuBook, 
  AutoFixHigh, 
  AddCircleOutline, 
  Logout,
  Badge
} from '@mui/icons-material';

import { logout, setUser } from '../store/user/userSlice';
import type { RootState } from '../store/store';
import { CustomButton } from '../ui/CustomButton';
import { userService } from '../utils/userService';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.user);
  const [isFetching, setIsFetching] = useState(false);

  const getProfile = async () => {
    try {
      setIsFetching(true);
      const data = await userService.getMyProfile();
      
      if (data) {
        dispatch(setUser(data)); 
      }
    } catch (error) {
      console.error("Profile load error:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

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
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mb: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {isFetching && !user ? (
            <Skeleton variant="circular" width={100} height={100} sx={{ mb: 2 }} />
          ) : (
            <Avatar 
              sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main', fontSize: '2.5rem' }}
            >
              {user?.firstName?.[0]?.toUpperCase() || 'U'}
            </Avatar>
          )}

          {/* Отображаем Имя и Фамилию */}
          <Typography variant="h4" fontWeight="bold">
            {isFetching && !user ? (
              <Skeleton width={200} />
            ) : (
              `${user?.firstName || ''} ${user?.secondName || ''}`.trim() || 'Пользователь'
            )}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {isFetching && !user ? <Skeleton width={150} /> : (user?.email || 'email@example.com')}
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

      <Grid container spacing={3}>
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card 
              elevation={2} 
              sx={{ 
                borderRadius: 4, 
                transition: '0.3s', 
                height: '100%',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } 
              }}
            >
              <CardActionArea onClick={() => navigate(item.path)} sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ display: 'inline-flex', p: 2, borderRadius: '50%', bgcolor: item.color, mb: 2 }}>
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

      <Box sx={{ p: 3, bgcolor: 'action.hover', borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          ID аккаунта: {user?.id || '...'}
        </Typography>
      </Box>
    </Container>
  );
};

export default ProfilePage;