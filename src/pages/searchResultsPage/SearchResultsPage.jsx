import { useDispatch, useSelector } from 'react-redux';
import {
  pageSelector,
  searchTermSelector,
  setPage,
  useGetMoviesBySearchQuery,
} from '../../redux/features/movies/moviesSlice';
import { Box, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {
  RenderList,
  Loading,
  MovieCard,
  MoviesSkeletonGrid,
  Pagination,
} from '../../components';
import { useRef } from 'react';
function SearchResultsPage() {
  const searchTerm = useSelector(searchTermSelector);
  const gridRef = useRef(null);
  const page = useSelector(pageSelector);
  const dispatch = useDispatch();
  const handleNextPage = () => {
    gridRef.current?.scrollIntoView();
    dispatch(setPage(page + 1));
  };
  const handlePrevPage = () => {
    gridRef.current?.scrollIntoView();
    dispatch(setPage(page - 1));
  };
  const queryFromURL = new URL(location.href).searchParams.get('q');
  const { data, isLoading, isFetching, isError, error } =
    useGetMoviesBySearchQuery(
      {
        searchTerm: searchTerm || queryFromURL,
        page,
      },
      { skip: !searchTerm && !queryFromURL }
    );

  if (!queryFromURL && !searchTerm) {
    return (
      <Box
        position='absolute'
        top='50%'
        left='50%'
        textAlign='center'
        sx={{ transform: 'translate(-50%, -50%)' }}
      >
        <Typography variant='h5' color='GrayText'>
          Movies results goes here
        </Typography>
      </Box>
    );
  }

  if (data?.results.length === 0) {
    return (
      <Box
        position='absolute'
        top='50%'
        left='50%'
        textAlign='center'
        sx={{ transform: 'translate(-50%, -50%)' }}
      >
        <Typography variant='h5' color='GrayText'>
          No results found for the term{' '}
          <Typography
            variant='h5'
            component='span'
            color='indianred'
            borderBottom='1px solid indianred'
            pb={0.5}
          >
            {searchTerm || queryFromURL}
          </Typography>{' '}
          ,
          <br />
          Please search for something else
        </Typography>
      </Box>
    );
  }

  return (
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
      <Loading
        isLoading={isFetching}
        isError={isError}
        error={error}
        spinner={<MoviesSkeletonGrid numberOfSkeletons={10} />}
      >
        <Grid container spacing={3} ref={gridRef}>
          <RenderList
            data={data?.results}
            renderItem={(movie) => (
              <Grid xs={12} md={6} lg={4} xl={2.4} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            )}
          />
        </Grid>
      </Loading>
      <Pagination
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        currentPage={page}
        totalPages={data?.total_pages}
        style={{ marginTop: '15px' }}
      />
    </Loading>
  );
}
export default SearchResultsPage;
