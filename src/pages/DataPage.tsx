import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Paper, Typography, Box, Divider, Fade, TextField, Grid, Card, CardContent } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { fetchRandomQuote, postQuote, fetchQuotesList } from '../store/quotesSlice';
import type { RootState, AppDispatch } from '../store/store';
import { CustomButton } from '../ui/CustomButton';

import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AddCommentIcon from '@mui/icons-material/AddComment';

const PAGE_LIMIT = 10; // Сколько цитат грузим за раз

const DataPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentQuote, allQuotes } = useSelector((state: RootState) => state.quotes);
  const { isLoading } = useSelector((state: RootState) => state.settings);

  const [newQuoteText, setNewQuoteText] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleRefreshRandom = () => dispatch(fetchRandomQuote());

  // Первичная загрузка
  useEffect(() => {
    dispatch(fetchRandomQuote());
    loadInitialQuotes();
  }, [dispatch]);

  const loadInitialQuotes = async () => {
    const result = await dispatch(fetchQuotesList({ offset: 0, limit: PAGE_LIMIT }));
    // Если пришло меньше, чем просили, значит дальше пусто
    if (result.payload.length < PAGE_LIMIT) setHasMore(false);
  };

  const handleLoadMore = async () => {
    const nextOffset = offset + PAGE_LIMIT;
    const result = await dispatch(fetchQuotesList({ offset: nextOffset, limit: PAGE_LIMIT }));
    
    if (result.payload.length < PAGE_LIMIT) {
      setHasMore(false); // Скрываем кнопку, если данных больше нет
    }
    setOffset(nextOffset);
  };

  const handlePublish = async () => {
    if (!newQuoteText.trim()) return;
    await dispatch(postQuote(newQuoteText));
    setNewQuoteText('');
    setOffset(0); // Сбрасываем пагинацию при новом посте
    setHasMore(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>{/* СЕКЦИЯ 1: Случайная цитата (Вдохновение) */}
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

      {/* СЕКЦИЯ 3: Лента цитат*/}

      <Divider sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.disabled' }}>
          <HistoryIcon fontSize="small" />
          <Typography variant="body2">ЛЕНТА ЦИТАТ</Typography>
        </Box>
      </Divider>

      <Grid container spacing={3}>
        {allQuotes.map((item, index) => (
          <Grid item xs={12} key={`${item.creationDate}-${index}`}>
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="body1" sx={{ mb: 2 }}>{item.quoteText}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2" color="primary">@{item.username}</Typography>
                  <Typography variant="caption" color="text.disabled">
                    {item.creationDate} {/* Используем строку напрямую, как шлет бэк */}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* КНОПКА ПАГИНАЦИИ */}
      {hasMore && allQuotes.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CustomButton 
            onClick={handleLoadMore} 
            variant="outlined" 
            disabled={isLoading}
            sx={{ px: 4 }}
          >
            {isLoading ? 'Загрузка...' : 'Показать еще'}
          </CustomButton>
        </Box>
      )}

      {!hasMore && allQuotes.length > 0 && (
        <Typography align="center" color="text.disabled" sx={{ mt: 4, fontStyle: 'italic' }}>
          Вы просмотрели все цитаты
        </Typography>
      )}
    </Container>
  );
};

export default DataPage;