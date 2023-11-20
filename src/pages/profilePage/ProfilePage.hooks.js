import { useGetAccountMoviesListQuery } from '../../redux/features/movies/moviesSlice';

const useProfilePage = (userId, sessionId) => {
  const {
    data: favoriteMovies,
    isLoading: isFavoriteMoviesLoading,
    isError: isErrorFavoriteMovies,
    error: errorFavoriteMovies,
  } = useGetAccountMoviesListQuery(
    {
      accountId: userId,
      sessionId,
      listType: 'favorite',
    },
    { refetchOnMountOrArgChange: true }
  );
  const {
    data: watchlistMovies,
    isLoading: isWatchlistMoviesLoading,
    isError: isErrorWatchlistMovies,
    error: errorWatchlistMovies,
  } = useGetAccountMoviesListQuery(
    {
      accountId: userId,
      sessionId,
      listType: 'watchlist',
    },
    { refetchOnMountOrArgChange: true }
  );
  return [
    {
      title: 'Favorite',
      requestInfo: {
        data: favoriteMovies,
        isLoading: isFavoriteMoviesLoading,
        isError: isErrorFavoriteMovies,
        error: errorFavoriteMovies,
      },
    },
    {
      title: 'Watchlist',
      requestInfo: {
        data: watchlistMovies,
        isLoading: isWatchlistMoviesLoading,
        isError: isErrorWatchlistMovies,
        error: errorWatchlistMovies,
      },
    },
  ];
};
export default useProfilePage;
