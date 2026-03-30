import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { fetchQuotesList } from '../store/quotesSlice';
import { CustomButton } from '../ui/CustomButton';
import type { RootState, AppDispatch } from '../store/store';
import HistoryIcon from '@mui/icons-material/History';

const QuotesListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allQuotes } = useSelector((state: RootState) => state.quotes);
  const { isLoading } = useSelector((state: RootState) => state.settings);
  const [offset, setOffset] = useState(0);

  useEffect(() => { dispatch(fetchQuotesList({ offset: 0, limit: 10 })); }, [dispatch]);

  const handleMore = () => {
    const next = offset + 10;
    dispatch(fetchQuotesList({ offset: next, limit: 10 }));
    setOffset(next);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>

      <Divider sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.disabled' }}>
            <HistoryIcon fontSize="large" />
            <Typography variant="h4">ЛЕНТА ЦИТАТ</Typography>
        </Box>
      </Divider>
      <Grid container spacing={2}>
        {allQuotes.map((q, i) => (
          <Grid item xs={12} key={i}>
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="body1" sx={{ mb: 1 }}>{q.quoteText}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="primary">@{q.username}</Typography>
                  <Typography variant="caption" color="text.secondary">{q.creationDate}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CustomButton onClick={handleMore} variant="text" disabled={isLoading}>
          Загрузить еще
        </CustomButton>
      </Box>
    </Container>
  );
};

export default QuotesListPage;