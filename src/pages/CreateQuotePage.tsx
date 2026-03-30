import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Paper, Typography, TextField, Box } from '@mui/material';
import { postQuote } from '../store/quotesSlice';
import { CustomButton } from '../ui/CustomButton';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store/store';
import AddCommentIcon from '@mui/icons-material/AddComment';

const CreateQuotePage: React.FC = () => {
  const [newQuoteText, setNewQuoteText] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.settings);

  const handlePublish = async () => {
    await dispatch(postQuote(newQuoteText));
    navigate('/quotes'); // После публикации перекидываем в общую ленту
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 4, mb: 6, bgcolor: 'action.hover' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
          <AddCommentIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">Поделиться своей цитатой</Typography>
        </Box>
        
        <TextField
          fullWidth
          multiline
          rows={4}
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
    </Container>
  );
};

export default CreateQuotePage;