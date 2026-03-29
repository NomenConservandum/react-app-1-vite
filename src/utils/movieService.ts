import api from './api';

export interface Movie { id: number; title: string; year: number; }
export interface Genre { id: number; name: string; }
export interface Director { id: number; firstName: string; secondName: string; }

export const movieService = {
  getMovies: () => api.get<Movie[]>('/api/Movie/GetList'),
  getGenres: () => api.get<Genre[]>('/api/Genre/GetList'),
  getDirectors: () => api.get<Director[]>('/api/Director/GetList'),
};