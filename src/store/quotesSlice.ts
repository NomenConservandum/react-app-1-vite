import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import type { QuoteResponse } from '../types/api';
import { setLoading, setError } from './settingsSlice';

interface QuotesState {
  currentQuote: QuoteResponse | null;
  allQuotes: QuoteResponse[];
}

const initialState: QuotesState = {
  currentQuote: null,
  allQuotes: [],
};

export const fetchRandomQuote = createAsyncThunk('quotes/fetchRandom', async () => {
  const response = await api.get('/api/Quote/GetRand');
  return response.data as QuoteResponse;
});

export const fetchQuotesList = createAsyncThunk(
  'quotes/fetchList',
  async ({ offset, limit }: { offset: number; limit: number }) => {
    const response = await api.get(`/api/Quote/${offset}/${limit}`);
    return response.data as QuoteResponse[];
  }
);

export const postQuote = createAsyncThunk(
  'quotes/post',
  async (text: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await api.post('/api/Quote', null, { params: { quoteText: text } });
      dispatch(fetchRandomQuote());
      dispatch(fetchQuotesList({ offset: 0, limit: 10 }));
    } catch (error: any) {
      const message = error.response?.data?.errors?.quoteText?.[0] || 'Ошибка публикации';
      dispatch(setError(message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.currentQuote = action.payload;
      })
      .addCase(fetchQuotesList.fulfilled, (state, action) => {
        if (action.meta.arg.offset === 0) {
          state.allQuotes = action.payload;
        } else {
          state.allQuotes = [...state.allQuotes, ...action.payload];
        }
      });
  },
});

export default quotesSlice.reducer;