import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import { setLoading, setError } from './settingsSlice';
import type { QuoteResponse } from '../types/api';

export const fetchRandomQuote = createAsyncThunk(
  'quotes/fetchRandom',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.get('/api/Quote/GetRand');
      return response.data;
    } catch (error: unknown) {
      dispatch(setError('Ошибка при загрузке цитаты'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

interface QuotesState {
  currentQuote: QuoteResponse | null;
}

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: { currentQuote: null } as QuotesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRandomQuote.fulfilled, (state, action) => {
      state.currentQuote = action.payload;
    });
  },
});

export const postQuote = createAsyncThunk(
  'quotes/post',
  async (quoteText: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      // Отправляем объект, который ожидает контроллер
      const response = await api.post('/api/Quote/PostQuote', { quoteText });
      dispatch(fetchRandomQuote()); // Обновляем текущую цитату после публикации
      return response.data;
    } catch (error: any) {
      dispatch(setError(error.response?.data?.message || 'Не удалось опубликовать цитату'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export default quotesSlice.reducer;