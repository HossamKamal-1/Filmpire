import { createSlice } from '@reduxjs/toolkit';
import { apiSlice, baseURL, tmdbApiKey } from '../api/apiSlice';
import axios from 'axios';

const initialState = {
  currentCategoryOrGenreId: '',
  allGenres: null,
  searchTerm: '',
  page: 1,
};
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setCategoryOrGenreId(currentState, action) {
      if (currentState.currentCategoryOrGenreId !== action.payload) {
        currentState.page = 1;
      }
      currentState.currentCategoryOrGenreId = action.payload;
      currentState.searchTerm = '';
    },
    setSearchTerm(currentState, action) {
      currentState.page = 1;
      currentState.searchTerm = action.payload;
      currentState.currentCategoryOrGenreId = '';
    },
    setPage(currentState, action) {
      currentState.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      extendedApi.endpoints.getAvailableGenres.matchFulfilled,
      (currentState, action) => {
        currentState.allGenres = action.payload.genres;
      }
    );
  },
});

// RTK QUERY
const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMoviesByNameOrId: build.query({
      query: ({ nameOrId, page = 1 }) => {
        // get movies by category name
        if (nameOrId && typeof nameOrId === 'string') {
          return `movie/${nameOrId}?language=en-US&page=${page}&api_key=${tmdbApiKey}`;
        }
        // get movies by genre id
        if (nameOrId !== '' && typeof nameOrId === 'number') {
          return `discover/movie?language=en-US&page=${page}&with_genres=${nameOrId}&api_key=${tmdbApiKey}`;
        }
        // get popular movies
        return `movie/popular?language=en-US&page=${page}&api_key=${tmdbApiKey}`;
      },
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.page) {
          delete newQueryArgs.page;
        }
        return newQueryArgs;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        const filteredCacheResults = currentCache.results.filter(
          ({ id }) => newItems.results.findIndex((m) => m.id === id) === -1
        );
        return {
          ...currentCache,
          ...newItems,
          results: [...filteredCacheResults, ...newItems.results],
        };
      },
      // Refetch when the page arg changes or category/genre changes
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg.page !== previousArg?.page ||
          currentArg.nameOrId !== previousArg?.nameOrId
        );
      },
    }),
    getMoviesBySearch: build.query({
      query: ({ searchTerm, page }) =>
        `search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${page}&api_key=${tmdbApiKey}`,
    }),
    getAvailableGenres: build.query({
      query: () => `genre/movie/list?language=en&api_key=${tmdbApiKey}`,
    }),
    getMovieById: build.query({
      query: (movieId) =>
        `movie/${movieId}?append_to_response=videos,images,credits&api_key=${tmdbApiKey}`,
    }),
    getRelatedMovieList: build.query({
      query: ({ movieId, listType = 'recommendations', page = 1 }) =>
        `movie/${movieId}/${listType}?page=${page}&api_key=${tmdbApiKey}`,
    }),
    getAccountMoviesList: build.query({
      query: ({ accountId, sessionId, listType = 'favorite', page = 1 }) =>
        `account/${accountId}/${listType}/movies?page=${page}&session_id=${sessionId}&api_key=${tmdbApiKey}`,
    }),
    getMovieActor: build.query({
      query: (actorId) => `person/${actorId}?api_key=${tmdbApiKey}`,
    }),
    getMoviesByActorId: build.query({
      query: ({ actorId, page = 1 }) =>
        `discover/movie?with_cast=${actorId}&page=${page}&api_key=${tmdbApiKey}`,
    }),
    addMovieToUserList: build.mutation({
      queryFn: async (
        { listType = 'favorite', movieId, isAdd },
        { getState }
      ) => {
        const accountId = getState().auth.userInfo.id;
        const sessionId = getState().auth.sessionId;
        try {
          const data = await axios.post(
            `${baseURL}/account/${accountId}/${listType}`,
            {
              media_type: 'movie',
              media_id: movieId,
              [listType]: isAdd,
            },
            {
              params: {
                session_id: sessionId,
                api_key: tmdbApiKey,
              },
            }
          );
          return data;
        } catch (e) {
          return e;
        }
      },
    }),
  }),
  overrideExisting: false,
});

// selectors
export const currentCategoryOrGenreSelector = (globalState) =>
  globalState.movies.currentCategoryOrGenreId;
export const searchTermSelector = (globalState) =>
  globalState.movies.searchTerm;
export const pageSelector = (globalState) => globalState.movies.page;
// actions/hooks
export const { setCategoryOrGenreId, setSearchTerm, setPage } =
  moviesSlice.actions;
export const {
  useGetAvailableGenresQuery,
  useGetMoviesByNameOrIdQuery,
  useGetMoviesBySearchQuery,
  useGetMovieByIdQuery,
  useGetRelatedMovieListQuery,
  useGetAccountMoviesListQuery,
  useGetMovieActorQuery,
  useGetMoviesByActorIdQuery,
  useAddMovieToUserListMutation,
} = extendedApi;
export default moviesSlice.reducer;
