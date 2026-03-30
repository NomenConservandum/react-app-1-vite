import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Paper, Typography, Box, Divider, Fade } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { fetchRandomQuote } from '../store/quotesSlice';
import type { RootState, AppDispatch } from '../store/store';
import { CustomButton } from '../ui/CustomButton';

const DataPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentQuote = useSelector((state: RootState) => state.quotes?.currentQuote);
  const { isLoading } = useSelector((state: RootState) => state.settings);

  // Загружаем первую цитату при входе
  useEffect(() => {
    if (!currentQuote) {
      dispatch(fetchRandomQuote());
    }
  }, [dispatch, currentQuote]);

  const handleRefresh = () => {
    dispatch(fetchRandomQuote());
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <Fade in={true} timeout={1000}>
        <Paper 
          elevation={6} 
          sx={{ 
            p: { xs: 4, md: 8 }, 
            borderRadius: 4, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          {/* Большая декоративная кавычка на фоне */}
          <FormatQuoteIcon 
            sx={{ 
              position: 'absolute', 
              top: -20, 
              left: -20, 
              fontSize: '12rem', 
              color: 'rgba(25, 118, 210, 0.05)', // Цвет основной темы с низкой прозрачностью
              transform: 'rotate(180deg)'
            }} 
          />

          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 800, 
              color: 'primary.main',
              letterSpacing: -1,
              mb: 4
            }}
          >
            Цитата дня
          </Typography>
          
          <Divider sx={{ mb: 6, width: '40%', mx: 'auto', height: 3, borderRadius: 1, bgcolor: 'primary.light' }} />

          <Box sx={{ minHeight: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {currentQuote ? (
              <>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontStyle: 'italic', 
                    lineHeight: 1.5,
                    color: '#1f2937',
                    fontWeight: 500,
                    px: { md: 4 }
                  }}
                >
                  «{currentQuote.quoteText}»
                </Typography>
                
                <Box sx={{ mt: 4, textAlign: 'right', width: '100%', pr: { md: 6 } }}>
                  <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                    — {currentQuote.username || 'Неизвестный автор'}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    Добавлено: {new Date(currentQuote.creationDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </>
            ) : (
              <Typography variant="h5" color="text.disabled">
                Нажмите кнопку ниже, чтобы получить мудрость...
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 6 }}>
            <CustomButton 
              onClick={handleRefresh} 
              disabled={isLoading}
              size="large"
              variant="contained"
              tooltipText="Получить новую случайную цитату из базы"
              sx={{ 
                px: 6, 
                py: 2, 
                borderRadius: '50px',
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: 4
              }}
            >
              {isLoading ? 'Загрузка...' : 'Следующая цитата'}
            </CustomButton>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default DataPage;