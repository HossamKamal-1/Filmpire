import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link, useParams } from 'react-router-dom';
import {
  useGetMovieActorQuery,
  useGetMoviesByActorIdQuery,
} from '../../redux/features/movies/moviesSlice';
import {
  RenderList,
  Loading,
  MovieCard,
  MoviesSkeletonGrid,
  Pagination,
} from '../../components';
import ActorPageSkeleton from './ActorPageSkeleton';
import { useState } from 'react';
import { ArrowBackIosNewRounded, Movie } from '@mui/icons-material';

function ActorPage() {
  const [page, setPage] = useState(1);
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };
  const { actorId } = useParams();
  const {
    data: actorInfo,
    isLoading: isLoadingActorInfo,
    error: errorActorInfo,
    isError: isErrorActorInfo,
  } = useGetMovieActorQuery(actorId);
  const {
    data: actorMovies,
    isLoading: isLoadingActorMovies,
    isFetching: isFetchingActorMovies,
    error: errorActorMovies,
    isError: isErrorActorMovies,
  } = useGetMoviesByActorIdQuery({ actorId, page }, { skip: !actorInfo });
  const actorLinks = (
    <>
      <Stack flexDirection='row' justifyContent='center' gap={2} mt={2}>
        <Button
          startIcon={<Movie />}
          href={`https://www.imdb.com/name/${actorInfo?.imdb_id}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          IMDB
        </Button>
        <Button
          variant='contained'
          startIcon={<ArrowBackIosNewRounded />}
          component={Link}
          to='/'
        >
          Back
        </Button>
      </Stack>
    </>
  );
  return (
    <Box>
      <Loading
        isLoading={isLoadingActorInfo}
        error={errorActorInfo}
        isError={isErrorActorInfo}
        spinner={<ActorPageSkeleton />}
      >
        <Box mb={2}>
          {actorInfo?.biography ? (
            <Grid container justifyContent='center' spacing={2}>
              <Grid md={6} lg={5}>
                <Box>
                  <CardMedia
                    component='img'
                    src={`https://image.tmdb.org/t/p/w500/${actorInfo?.profile_path}`}
                    height={600}
                    sx={{
                      borderRadius: '8px',
                    }}
                  />
                </Box>
              </Grid>
              <Grid md={6} lg={7} textAlign='center'>
                <Box>
                  <Typography
                    variant='subtitle1'
                    fontSize={30}
                    color='text.primary'
                  >
                    {actorInfo?.name}
                  </Typography>
                  <Typography
                    component='p'
                    color='text.primary'
                    lineHeight={1.3}
                  >
                    {actorInfo?.biography}
                  </Typography>
                </Box>
                {actorLinks}
              </Grid>
            </Grid>
          ) : (
            <Box textAlign='center'>
              <img
                src={`https://image.tmdb.org/t/p/w500/${actorInfo?.profile_path}`}
                style={{
                  borderRadius: '8px',
                  width: '600px',
                  aspectRatio: '1/1.1',
                  objectFit: 'cover',
                  maxWidth: '100%',
                }}
              />
              <Typography
                variant='subtitle1'
                fontSize={30}
                color='text.primary'
              >
                {actorInfo?.name}
              </Typography>
              {actorLinks}
            </Box>
          )}
        </Box>
      </Loading>
      {/* Actor Movies */}
      {actorInfo && (
        <Typography
          variant='h2'
          textAlign='center'
          color='text.primary'
          gutterBottom
        >
          Movies
        </Typography>
      )}
      <Loading
        isLoading={isLoadingActorMovies}
        isError={isErrorActorMovies}
        error={errorActorMovies}
        spinner={
          <Stack alignItems='center'>
            <CircularProgress />
          </Stack>
        }
      >
        <Loading
          isLoading={isFetchingActorMovies}
          isError={isErrorActorMovies}
          error={errorActorMovies}
          spinner={<MoviesSkeletonGrid numberOfSkeletons={12} />}
        >
          <Grid container spacing={3}>
            <RenderList
              data={actorMovies?.results}
              renderItem={(movie) => (
                <Grid xs={12} md={4} lg={3} xl={2.4} key={movie.id}>
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
          totalPages={actorMovies?.total_pages}
        />
      </Loading>
    </Box>
  );
}
export default ActorPage;
