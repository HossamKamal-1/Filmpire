import { createSlice } from '@reduxjs/toolkit';
import { apiSlice, tmdbApiKey } from '../api/apiSlice';
const initialState = {
  userInfo: null,
  isAuthenticated: false,
  sessionId: localStorage.getItem('session_id'),
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get User Info Related
    builder
      .addMatcher(
        extendedApi.endpoints.getUserInfo.matchFulfilled,
        (currentState, action) => {
          currentState.userInfo = action.payload;
          currentState.isAuthenticated = true;
        }
      )
      // Create Session Related
      .addMatcher(
        extendedApi.endpoints.createSessionId.matchFulfilled,
        (currentState, action) => {
          if (action.payload.success) {
            localStorage.setItem('session_id', action.payload.session_id);
            currentState.sessionId = action.payload.session_id;
          }
        }
      )
      // Delete Session Related
      .addMatcher(
        extendedApi.endpoints.deleteUserSession.matchFulfilled,
        (currentState, action) => {
          if (action.payload.success) {
            localStorage.removeItem('session_id');
            localStorage.removeItem('request_token');
            currentState.sessionId = null;
            currentState.userInfo = null;
            currentState.isAuthenticated = false;
          }
        }
      );
  },
});

export const { test } = authSlice.actions;

// RTK QUERY
const extendedApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createRequestToken: build.query({
      query: () => `authentication/token/new?api_key=${tmdbApiKey}`,
    }),
    createSessionId: build.query({
      query: (requestToken) => ({
        url: 'authentication/session/new',
        method: 'POST',
        params: {
          api_key: tmdbApiKey,
          request_token: requestToken,
        },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled.catch(({ error }) => {
          if (error.data.failure) {
            localStorage.removeItem('request_token');
            localStorage.removeItem('session_id');
          }
        });
      },
    }),
    getUserInfo: build.query({
      query: (sessionId) =>
        `account?session_id=${sessionId}&api_key=${tmdbApiKey}`,
    }),
    deleteUserSession: build.query({
      query: () => ({
        method: 'DELETE',
        url: 'authentication/session',
        params: {
          api_key: tmdbApiKey,
        },
        body: {
          session_id: localStorage.getItem('session_id'),
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export const authSelector = (globalState) => globalState.auth;
export const userSelector = (globalState) => globalState.auth.userInfo;
export const sessionIdSelector = (globalState) => globalState.auth.sessionId;
export const isAuthenticatedSelector = (globalState) =>
  globalState.auth.isAuthenticated;
export const {
  useLazyCreateRequestTokenQuery,
  useCreateSessionIdQuery,
  useGetUserInfoQuery,
  useLazyDeleteUserSessionQuery,
} = extendedApi;
export default authSlice.reducer;
