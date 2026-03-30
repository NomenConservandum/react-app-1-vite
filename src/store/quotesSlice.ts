import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import { setLoading, setError } from './settingsSlice';

export interface QuoteResponse {
  quoteText: string;
  username: string;
  creationDate: string;
}

interface QuotesState {
  currentQuote: QuoteResponse | null;
  allQuotes: QuoteResponse[];
}

const initialState: QuotesState = {
  currentQuote: null,
  allQuotes: [],
};

// Получение одной случайной цитаты
export const fetchRandomQuote = createAsyncThunk(
  'quotes/fetchRandom',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.get('/api/Quote/GetRand');
      return response.data; // Ожидаем объект QuoteResponse
    } catch (error: any) {
      dispatch(setError('Не удалось загрузить случайную цитату'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

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

// Получение списка цитат с пагинацией через сегменты пути
export const fetchQuotesList = createAsyncThunk(
  'quotes/fetchList',
  async ({ offset, limit }: { offset: number; limit: number }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      // Формируем путь /api/Quote/0/10
      const response = await api.get(`/api/Quote/${offset}/${limit}`);
      return response.data; // Ожидаем массив QuoteResponse[]
    } catch (error: any) {
      dispatch(setError('Ошибка при загрузке ленты цитат'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    clearQuotes: (state) => {
      state.allQuotes = [];
      state.currentQuote = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Обработка случайной цитаты
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.currentQuote = action.payload;
      })
      // Обработка списка цитат
      .addCase(fetchQuotesList.fulfilled, (state, action) => {
        state.allQuotes = action.payload;
      });
  },
});

export const { clearQuotes } = quotesSlice.actions;
export default quotesSlice.reducer;