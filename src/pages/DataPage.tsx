import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, Paper, Typography, Box, Divider, Fade, TextField, 
  Grid, Avatar, Card, CardContent 
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AddCommentIcon from '@mui/icons-material/AddComment';
import HistoryIcon from '@mui/icons-material/History';

import { fetchRandomQuote, postQuote, fetchQuotesList } from '../store/quotesSlice';
import type { RootState, AppDispatch } from '../store/store';
import { CustomButton } from '../ui/CustomButton';

const DataPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Достаем данные из нашего обновленного слайса
  const { currentQuote, allQuotes } = useSelector((state: RootState) => state.quotes);
  const { isLoading } = useSelector((state: RootState) => state.settings);
  
  const [newQuoteText, setNewQuoteText] = useState('');

  // 1. При загрузке страницы получаем и случайную цитату, и список (первые 10 штук)
  useEffect(() => {
    dispatch(fetchRandomQuote());
    dispatch(fetchQuotesList({ offset: 0, limit: 10 }));
  }, [dispatch]);

  const handleRefreshRandom = () => dispatch(fetchRandomQuote());

  const handlePublish = async () => {
    if (!newQuoteText.trim()) return;
    
    // Отправляем цитату (внутри thunk она уйдет как query-параметр)
    await dispatch(postQuote(newQuoteText));
    setNewQuoteText(''); // Очищаем поле ввода
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      
      {/* СЕКЦИЯ 1: Случайная цитата (Вдохновение) */}
      <Fade in={true} timeout={600}>
        <Paper 
          elevation={4} 
          sx={{ 
            p: 4, borderRadius: 4, textAlign: 'center', mb: 5, 
            position: 'relative', bgcolor: 'background.paper',
            border: '1px solid', borderColor: 'divider'
          }}
        >
          <FormatQuoteIcon sx={{ position: 'absolute', top: 10, left: 10, fontSize: '4rem', opacity: 0.1, color: 'primary.main' }} />
          
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
            Случайная мысль
          </Typography>

          <Box sx={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
            {currentQuote ? (
              <Typography variant="h5" sx={{ fontStyle: 'italic', fontWeight: 500 }}>
                «{currentQuote.quoteText}»
              </Typography>
            ) : (
              <Typography color="text.disabled">Загрузка мудрости...</Typography>
            )}
          </Box>

          <CustomButton onClick={handleRefreshRandom} disabled={isLoading} variant="outlined" size="small">
            Обновить случайную
          </CustomButton>
        </Paper>
      </Fade>

      {/* СЕКЦИЯ 2: Форма создания */}
      <Paper elevation={2} sx={{ p: 3, borderRadius: 4, mb: 6, bgcolor: 'action.hover' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
          <AddCommentIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">Поделиться своей цитатой</Typography>
        </Box>
        
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Что у вас на уме?"
          value={newQuoteText}
          onChange={(e) => setNewQuoteText(e.target.value)}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CustomButton onClick={handlePublish} disabled={isLoading || !newQuoteText.trim()}>
            Опубликовать
          </CustomButton>
        </Box>
      </Paper>

      <Divider sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.disabled' }}>
          <HistoryIcon fontSize="small" />
          <Typography variant="body2" sx={{ textTransform: 'uppercase', tracking: 1 }}>Лента цитат</Typography>
        </Box>
      </Divider>

      {/* СЕКЦИЯ 3: Список всех цитат (Лента) */}
      <Grid container spacing={3}>
        {allQuotes.length > 0 ? (
          allQuotes.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Fade in={true} timeout={400 + index * 100}>
                <Card variant="outlined" sx={{ borderRadius: 3, transition: '0.3s', '&:hover': { boxShadow: 3 } }}>
                  <CardContent>
                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {item.quoteText}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem', bgcolor: 'primary.light' }}>
                          {item.username[0].toUpperCase()}
                        </Avatar>
                        <Typography variant="subtitle2" color="primary.main">
                          {item.username}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.disabled">
                        Добавлено: {item.creationDate}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography color="text.disabled">Тут пока тихо... Напишите что-нибудь!</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default DataPage;