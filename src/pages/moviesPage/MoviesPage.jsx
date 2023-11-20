import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, CircularProgress } from '@mui/material';
import { MovieCard, RenderList, FeaturedMovieCard } from '../../components';
import Loading from '../../components/loading/Loading';
import {
  currentCategoryOrGenreSelector,
  pageSelector,
  setPage,
  useGetMoviesByNameOrIdQuery,
} from '../../redux/features/movies/moviesSlice';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { memo } from 'react';
const MovieCardMemoized = memo(MovieCard);
function MoviesPage() {
  const dispatch = useDispatch();
  const page = useSelector(pageSelector);
  const currentCategoryOrGenreId = useSelector(currentCategoryOrGenreSelector);
  const { data, isFetching, isLoading, isError, error } =
    useGetMoviesByNameOrIdQuery({
      nameOrId: currentCategoryOrGenreId,
      page,
    });

  const totalPages = data?.total_pages;
  const handleNextPage = () => {
    dispatch(setPage(page + 1));
  };
  const [lastNodeRef] = useInfiniteScroll(
    page,
    totalPages,
    isFetching,
    handleNextPage
  );
  return (
    <>
      <Loading
        isLoading={isLoading}
        isError={isError}
        error={error}
        spinner={
          <Box
            position='absolute'
            top='50%'
            left='50%'
            sx={{ transform: 'translate(-50%, -50%)' }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <FeaturedMovieCard movie={data?.results[0]} />
        <Grid container spacing={3}>
          <RenderList
            data={data?.results.slice(1)}
            renderItem={(movie, index) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                xl={2.4}
                key={movie.id}
                ref={
                  index + 1 === data.results.slice(1).length
                    ? lastNodeRef
                    : null
                }
              >
                <MovieCardMemoized movie={movie} index={index} />
              </Grid>
            )}
          />
        </Grid>
        {isFetching && (
          <Box textAlign='center'>
            <CircularProgress color='error' />
          </Box>
        )}
      </Loading>
    </>
  );
}
export default MoviesPage;
