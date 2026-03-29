// src/pages/DataPage.tsx
import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchRandomQuote } from '../store/quotesSlice';
import { CustomButton } from '../ui/CustomButton';

const DataPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentQuote } = useSelector((state: RootState) => state.quotes);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Случайная цитата
      </Typography>
      
      <Paper elevation={2} sx={{ p: 5, textAlign: 'center', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {currentQuote ? (
          <Typography variant="h5" sx={{ fontStyle: 'italic', mb: 4 }}>
            "{currentQuote}"
          </Typography>
        ) : (
          <Typography color="textSecondary" sx={{ mb: 4 }}>
            Нажмите кнопку, чтобы получить данные с сервера
          </Typography>
        )}

        <CustomButton 
          onClick={() => dispatch(fetchRandomQuote())}
          tooltipText="Загрузить новую цитату из API"
        >
          Обновить данные
        </CustomButton>
      </Paper>
    </Container>
  );
};

export default DataPage;