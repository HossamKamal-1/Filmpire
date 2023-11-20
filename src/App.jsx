import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ColorModeProvider from './contexts/colorMode/ColorModeContext';
import SnackbarProvider from './contexts/snackbar/SnackbarContext';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Suspense, lazy } from 'react';
import './main.css';
// UI PAGES/COMPONENTS
import { Box, CircularProgress, CssBaseline } from '@mui/material';
import MainLayout from './layouts/mainLayout/MainLayout';
import ErrorPage from './pages/errorPage/ErrorPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import MoviesPage from './pages/moviesPage/MoviesPage';

const ActorPage = lazy(() => import('./pages/actorPage/ActorPage'));
const MoviePage = lazy(() => import('./pages/moviePage/MoviePage'));
const SearchResultsPage = lazy(() =>
  import('./pages/searchResultsPage/SearchResultsPage')
);
const ProfilePage = lazy(() => import('./pages/profilePage/ProfilePage'));
const centeredCircularProgress = (
  <Box
    position='absolute'
    top='50%'
    left='50%'
    sx={{ transform: 'translate(-50%, -50%)' }}
  >
    <CircularProgress />
  </Box>
);
const handlePathParams = async ({ params }) => {
  if (isNaN(+params[Object.keys(params)[0]])) {
    // string
    throw new Response('Bad Request', { status: 400 });
  }
  return null;
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<MoviesPage />} />
        <Route path='approved' element={<Navigate to='/' replace />} />
        <Route
          path='movie/:movieId'
          element={
            <Suspense fallback={centeredCircularProgress}>
              <MoviePage />
            </Suspense>
          }
          loader={handlePathParams}
        />
        <Route
          path='search'
          element={
            <Suspense fallback={centeredCircularProgress}>
              <SearchResultsPage />
            </Suspense>
          }
        />
        <Route
          path='actors/:actorId'
          element={
            <Suspense fallback={centeredCircularProgress}>
              <ActorPage />
            </Suspense>
          }
          loader={handlePathParams}
        />
        <Route
          path='profile/:profileId'
          element={
            <Suspense fallback={centeredCircularProgress}>
              <ProfilePage />
            </Suspense>
          }
          loader={handlePathParams}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);
const App = () => (
  <>
    <ColorModeProvider>
      <Provider store={store}>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </Provider>
    </ColorModeProvider>
    <CssBaseline />
  </>
);
export default App;
