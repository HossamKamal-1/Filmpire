import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
export const baseURL = 'https://api.themoviedb.org/3';
const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;
const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: () => ({}),
});
export { apiSlice, tmdbApiKey };
