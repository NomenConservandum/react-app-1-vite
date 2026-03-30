import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const fetchRandomQuote = createAsyncThunk('quotes/fetchRandom', async () => {
  const response = await api.get('/api/Quote/GetRand');
  return response.data;
});

export const fetchQuotesList = createAsyncThunk(
  'quotes/fetchList', 
  async ({ offset, limit }: { offset: number; limit: number }) => {
    const response = await api.get(`/api/Quote/${offset}/${limit}`);
    return response.data;
  }
);

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: {
    currentQuote: null,
    allQuotes: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.currentQuote = action.payload;
      })
      .addCase(fetchQuotesList.fulfilled, (state, action) => {
        // Логика пагинации
        if (action.meta.arg.offset === 0) {
          state.allQuotes = action.payload;
        } else {
          state.allQuotes = [...state.allQuotes, ...action.payload];
        }
      });
  },
});

export default quotesSlice.reducer;

import { setLoading, setError } from './settingsSlice';

export interface QuoteResponse {
  quoteText: string;
  username: string;
  creationDate: string;
}

// Публикация цитаты через Query-параметр
export const postQuote = createAsyncThunk(
  'quotes/post',
  async (text: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      // Передаем текст в params, чтобы axios добавил его в URL как ?quoteText=...
      const response = await api.post('/api/Quote', null, {
        params: { quoteText: text }
      });
      
      // После успешной публикации обновляем список и случайную цитату
      dispatch(fetchRandomQuote());
      dispatch(fetchQuotesList({ offset: 0, limit: 10 }));
      
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.errors?.quoteText?.[0] || 'Ошибка публикации';
      dispatch(setError(message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
