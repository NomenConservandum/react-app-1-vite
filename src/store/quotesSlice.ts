// src/store/quotesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import { setLoading, setError } from './settingsSlice';

export const fetchRandomQuote = createAsyncThunk(
  'quotes/fetchRandom',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true)); // Использование action из другого слайса
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
  currentQuote: string | null;
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

export default quotesSlice.reducer;