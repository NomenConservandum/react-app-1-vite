import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Paper, Typography, Box, Divider, Fade, TextField } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { fetchRandomQuote, postQuote } from '../store/quotesSlice';
import type { RootState, AppDispatch } from '../store/store';
import { CustomButton } from '../ui/CustomButton';

const DataPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentQuote } = useSelector((state: RootState) => state.quotes);
  const { isLoading } = useSelector((state: RootState) => state.settings);
  
  const [newQuote, setNewQuote] = useState('');

  useEffect(() => {
    if (!currentQuote) {
      dispatch(fetchRandomQuote());
    }
  }, [dispatch, currentQuote]);

  const handleRefresh = () => dispatch(fetchRandomQuote());

  const handlePublish = async () => {
    if (!newQuote.trim()) return;
    await dispatch(postQuote(newQuote));
    setNewQuote(''); // Очищаем поле после публикации
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* БЛОК 1: Просмотр цитаты */}
      <Fade in={true} timeout={800}>
        <Paper 
          elevation={4} 
          sx={{ 
            p: { xs: 3, md: 6 }, 
            borderRadius: 4, 
            textAlign: 'center', 
            mb: 4, 
            position: 'relative', 
            overflow: 'hidden',
            bgcolor: 'background.paper', // Адаптивный фон
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <FormatQuoteIcon 
            sx={{ 
              position: 'absolute', 
              top: -10, 
              left: -10, 
              fontSize: '10rem', 
              color: 'primary.main', 
              opacity: 0.07 
            }} 
          />
          
          <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 700 }}>
            Мудрость сообщества
          </Typography>
          <Divider sx={{ my: 3, width: '40%', mx: 'auto' }} />

          <Box sx={{ minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {currentQuote ? (
              <>
                <Typography variant="h5" sx={{ fontStyle: 'italic', px: 2, color: 'text.primary' }}>
                  «{currentQuote.quoteText}»
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600, color: 'text.secondary' }}>
                  — {currentQuote.username}
                </Typography>
              </>
            ) : (
              <Typography color="text.disabled">Нажмите кнопку для загрузки...</Typography>
            )}
          </Box>

          <CustomButton 
            onClick={handleRefresh} 
            disabled={isLoading} 
            sx={{ mt: 4, borderRadius: 4, px: 4 }}
          >
            Следующая цитата
          </CustomButton>
        </Paper>
      </Fade>

      {/* БЛОК 2: Публикация новой цитаты (ИСПРАВЛЕННАЯ ТЕМА) */}
      <Fade in={true} timeout={1200}>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4, 
            borderRadius: 4, 
            bgcolor: 'action.hover', // Мягкий адаптивный фон (чуть темнее/светлее основного)
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
            <AddCommentIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Поделиться своей мыслью
            </Typography>
          </Box>
          
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Введите текст вашей цитаты..."
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            disabled={isLoading}
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper', // Поле ввода всегда на контрастном фоне
              }
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CustomButton 
              onClick={handlePublish} 
              disabled={isLoading || !newQuote.trim()}
              tooltipText="Ваша цитата будет доступна всем пользователям"
              sx={{ px: 4, borderRadius: 2 }}
            >
              Опубликовать
            </CustomButton>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default DataPage;