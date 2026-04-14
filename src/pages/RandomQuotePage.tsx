import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Paper, Typography, Fade } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { fetchRandomQuote } from '../store/quotesSlice';
import { CustomButton } from '../ui/CustomButton';
import type { RootState, AppDispatch } from '../store/store';
import type { QuoteResponse } from '../types/api';

const RandomQuotePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentQuote } = useSelector((state: RootState) => state.quotes) as { currentQuote: QuoteResponse | null };
  const { isLoading } = useSelector((state: RootState) => state.settings);

  useEffect(() => { dispatch(fetchRandomQuote()); }, [dispatch]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Fade in timeout={800}>
        <Paper elevation={6} sx={{ p: 6, borderRadius: 5, textAlign: 'center', position: 'relative' }}>
          <FormatQuoteIcon sx={{ position: 'absolute', top: 20, left: 20, fontSize: '5rem', opacity: 0.05 }} />
          <Typography variant="h4" fontStyle="italic" sx={{ mb: 4 }}>
            {currentQuote ? `«${currentQuote.quoteText}»` : 'Загрузка...'}
          </Typography>
          <Typography variant="subtitle1" color="primary" sx={{ mb: 4 }}>
            — {currentQuote?.username || 'Аноним'}
          </Typography>
          <CustomButton onClick={() => dispatch(fetchRandomQuote())} disabled={isLoading}>Другая цитата</CustomButton>
        </Paper>
      </Fade>
    </Container>
  );
};

export default RandomQuotePage;