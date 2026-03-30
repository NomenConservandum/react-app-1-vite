import React, { useContext } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  useTheme,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../ui/CustomButton';
import { ColorModeContext } from '../App';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggleTheme } = useContext(ColorModeContext);

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
            Банк Цитат
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            color="text.secondary" 
            paragraph
            sx={{ mb: 6 }}
          >
            Платформа для обмена цитатами.
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
              Начать обмен цитатами
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
    </Box>
  );
};

export default LandingPage;