import React, { useContext } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  Card, 
  CardContent, 
  useTheme,
  Grid
} from '@mui/material';

import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';
import AdsClickIcon from '@mui/icons-material/AdsClick';

import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../ui/CustomButton';
import { ColorModeContext } from '../App';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggleTheme } = useContext(ColorModeContext);

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Безопасность',
      desc: 'Надежная авторизация с использованием JWT токенов и защищенных роутов.'
    },
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Производительность',
      desc: 'Быстрая работа интерфейса благодаря React 18 и оптимизированному Redux Toolkit.'
    },
    {
      icon: <DevicesIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Адаптивность',
      desc: 'Интерфейс отлично выглядит как на десктопах, так и на мобильных устройствах.'
    }
  ];

  return (
    <Box>
      <Box 
        sx={{ 
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.100',
          py: { xs: 8, md: 12 },
          transition: 'background-color 0.3s ease',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.75rem' }
            }}
          >
            Управляйте данными эффективно
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            color="text.secondary" 
            paragraph
            sx={{ mb: 6 }}
          >
            Современная платформа на React и TypeScript с полной интеграцией вашего API.
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2} 
            justifyContent="center"
            alignItems="center"
          >
            <CustomButton 
              size="large" 
              onClick={() => navigate('/register')}
              tooltipText="Создать новый аккаунт"
              fullWidth={false}
            >
              Начать работу
            </CustomButton>
            <CustomButton 
              size="large" 
              variant="outlined" 
              onClick={() => navigate('/login')}
              tooltipText="Войти в существующий аккаунт"
              fullWidth={false}
            >
              У меня есть профиль
            </CustomButton>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4}>
        {features.map((f, index) => (
            // В новой версии MUI размеры передаются только через объект size
            <Grid size={{ xs: 12, md: 4 }} key={index}> 
            <Card 
                sx={{ 
                height: '100%', 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                boxShadow: 2
                }}
            >
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                {f.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: 600 }}>
                    {f.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {f.desc}
                </Typography>
                </CardContent>
            </Card>
            </Grid>
        ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;