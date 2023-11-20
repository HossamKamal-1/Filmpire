import { Link, useParams } from 'react-router-dom';
import {
  setCategoryOrGenreId,
  useAddMovieToUserListMutation,
  useGetAccountMoviesListQuery,
  useGetMovieByIdQuery,
  useGetRelatedMovieListQuery,
} from '../../redux/features/movies/moviesSlice';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import {
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  Modal,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  SmartDisplayRounded,
  PublicRounded,
  TheatersRounded,
  FavoriteRounded,
  FavoriteBorderOutlined,
  ArrowBackRounded,
  VisibilityRounded,
  VisibilityOffRounded,
} from '@mui/icons-material';
import genresIconsCollection from '../../assets/genres';
import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import notFoundPoster from '../../assets/images/notfoundposter.png';
import {
  Loading,
  ActorCard,
  MovieCard,
  RenderList,
  MoviesSkeletonGrid,
} from '../../components';
import MoviePageSkeleton from './MoviePageSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/features/auth/authSlice';
import { useOpenSnackbar } from '../../contexts/snackbar/useOpenSnackbar';

// swiperjs
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
function MoviePage() {
  const [toggleModal, setToggleModal] = useState(false);
  const [movieInteractables, setMovieInteractables] = useState({
    movielist: false,
    favorite: false,
  });
  const theme = useTheme();
  const { movieId } = useParams();
  const { openSnackbar } = useOpenSnackbar();
  const isMobileMedia = useMediaQuery(theme.breakpoints.down('lg'));
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const { data: favoriteMovies } = useGetAccountMoviesListQuery(
    {
      accountId: auth.userInfo?.id,
      sessionId: auth.sessionId,
      listType: 'favorite',
    },
    {
      skip: !auth.isAuthenticated,
    }
  );
  const { data: watchlistedMovies } = useGetAccountMoviesListQuery(
    {
      accountId: auth.userInfo?.id,
      sessionId: auth.sessionId,
      listType: 'watchlist',
    },
    {
      skip: !auth.isAuthenticated,
    }
  );

  useEffect(() => {
    if (favoriteMovies?.results) {
      const isMovieAlreadyFavorited = Boolean(
        favoriteMovies?.results.some(({ id }) => +movieId === id)
      );
      setMovieInteractables((prevInteractables) => ({
        ...prevInteractables,
        favorite: isMovieAlreadyFavorited,
      }));
    }
    if (watchlistedMovies?.results) {
      const isMovieAlreadyWatchlisted = Boolean(
        watchlistedMovies?.results.some(({ id }) => +movieId === id)
      );
      setMovieInteractables((prevInteractables) => ({
        ...prevInteractables,
        watchlist: isMovieAlreadyWatchlisted,
      }));
    }
  }, [watchlistedMovies?.results, favoriteMovies?.results, movieId]);
  const {
    data,
    isLoading,
    error,
    isError,
    isSuccess: isMovieInfoSuccess,
  } = useGetMovieByIdQuery(movieId);
  const {
    data: recommendedMovies,
    isLoading: isLoadingRecommendedMovies,
    error: ErrorRecommendedMovies,
    isError: isErrorRecommendedMovies,
  } = useGetRelatedMovieListQuery(
    { movieId, listType: 'recommendations' },
    {
      skip: !isMovieInfoSuccess,
    }
  );
  const [addMovieToUserList] = useAddMovieToUserListMutation();
  // functions
  const openModal = () => {
    setToggleModal(true);
  };
  const closeModal = () => {
    setToggleModal(false);
  };
  async function toggleMovieInteractable(interactableType = 'watchlist') {
    if (auth.isAuthenticated) {
      setMovieInteractables((prevInteractables) => ({
        ...prevInteractables,
        [interactableType]: !prevInteractables[interactableType],
      }));
      addMovieToUserList({
        listType: interactableType,
        movieId,
        isAdd: !movieInteractables[interactableType],
      })
        .unwrap()
        .then((response) => {
          if (!response) throw new Error('Connection Lost');
        })
        .catch(() => {
          setMovieInteractables((prevInteractables) => ({
            ...prevInteractables,
            [interactableType]: !prevInteractables[interactableType],
          }));
          openSnackbar(
            `Failed to add/remove movie to ${interactableType}`,
            'error',
            1500
          );
        });
    } else {
      openSnackbar(
        'Unregistered user, please register first to be able to interact',
        'error',
        1500
      );
    }
  }
  function handleGenreClick(genreId) {
    dispatch(setCategoryOrGenreId(genreId));
  }
  return (
    <>
      <Loading
        isLoading={isLoading}
        spinner={<MoviePageSkeleton />}
        error={error}
        isError={isError}
      >
        {/* Movie Trailer Modal */}
        {data?.videos.results.length > 0 && (
          <>
            <Modal
              open={toggleModal}
              onClose={closeModal}
              aria-labelledby='parent-modal-title'
              aria-describedby='parent-modal-description'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CardMedia
                component='iframe'
                src={`https://www.youtube.com/embed/${data?.videos.results[0].key}`}
                title='Movie trailer'
                sx={{
                  border: 'none',
                  borderRadius: '8px',
                  aspectRatio: { sm: '5/4', md: '16/9' },
                  width: { xs: '80%', sm: 'auto' },
                }}
                height={450}
              />
            </Modal>
          </>
        )}
        <Grid container marginBottom={1} spacing={4}>
          <Grid xs={12} md={5}>
            <Box>
              <CardMedia
                component='img'
                src={
                  !data?.poster_path
                    ? notFoundPoster
                    : `https://image.tmdb.org/t/p/w500${data?.poster_path}`
                }
                alt='movie poster'
                width='100%'
                sx={{
                  borderRadius: '8px',
                  objectFit: 'cover',
                  height: { xs: '550px', lg: 'calc(100vh - 64px - 24px)' },
                  boxShadow: '3px 3px 11px 0px #000000b1',
                }}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={7}>
            <Stack gap={3}>
              <Box textAlign='center'>
                <Typography variant='h3' color='text.primary'>
                  {data?.title} ({data?.release_date.split('-')[0]})
                </Typography>
                <Typography variant='h5' color='text.secondary'>
                  {data?.tagline}
                </Typography>
              </Box>
              <Stack
                direction='row'
                gap={2}
                justifyContent='center'
                flexWrap='wrap'
              >
                <Stack direction='row' spacing={1}>
                  <Rating
                    value={data?.vote_average / 2}
                    precision={0.1}
                    readOnly
                  />
                  <Typography color='text.primary'>
                    {data?.vote_average} / 10
                  </Typography>
                </Stack>
                <Typography color='text.primary'>
                  {data?.runtime}min / {data?.release_date}/{' '}
                  {data?.spoken_languages[0].name}
                </Typography>
              </Stack>
              {/* interactables */}
              <Stack
                flexWrap='wrap'
                gap={1}
                alignItems={{ xs: 'center' }}
                mt={2}
              >
                <Stack
                  gap={1}
                  flexDirection={{ xs: 'column', sm: 'row', lg: 'column' }}
                  alignItems={{ lg: 'center' }}
                >
                  <ButtonGroup
                    orientation={isMobileMedia ? 'vertical' : 'horizontal'}
                  >
                    {data?.homepage && (
                      <Button
                        href={data.homepage}
                        target='_blank'
                        rel='noopener noreferrer'
                        startIcon={<PublicRounded />}
                      >
                        Website
                      </Button>
                    )}
                    <Button
                      href={`https://www.imdb.com/title/${data?.imdb_id}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      startIcon={<TheatersRounded />}
                    >
                      IMDB
                    </Button>
                    <Button
                      onClick={openModal}
                      startIcon={<SmartDisplayRounded />}
                    >
                      TRAILER
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup
                    orientation={isMobileMedia ? 'vertical' : 'horizontal'}
                  >
                    <Button
                      onClick={() => toggleMovieInteractable('favorite')}
                      startIcon={
                        movieInteractables.favorite ? (
                          <FavoriteRounded />
                        ) : (
                          <FavoriteBorderOutlined />
                        )
                      }
                    >
                      {movieInteractables.favorite ? 'FAVOURITED' : 'FAVOURITE'}
                    </Button>
                    <Button
                      onClick={() => toggleMovieInteractable('watchlist')}
                      startIcon={
                        movieInteractables.watchlist ? (
                          <VisibilityRounded />
                        ) : (
                          <VisibilityOffRounded />
                        )
                      }
                    >
                      {movieInteractables.watchlist
                        ? 'WATCHLISTED'
                        : 'WATCHLIST'}
                    </Button>
                    <Button
                      component={Link}
                      to='/'
                      startIcon={<ArrowBackRounded />}
                    >
                      Back
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Stack>
              {/* Genre */}
              <Stack
                direction='row'
                justifyContent='space-around'
                flexWrap='wrap'
                gap={1}
                alignItems='center'
              >
                {data?.genres.map((genre) => (
                  <Stack
                    key={genre.id}
                    component={Link}
                    to={`/?genre=${genre.name.toLowerCase()}`}
                    flexDirection='row'
                    alignItems='inherit'
                    gap={1}
                    sx={{ textDecoration: 'none' }}
                    onClick={() => handleGenreClick(genre.id)}
                  >
                    <img
                      src={genresIconsCollection[genre.name]}
                      width={40}
                      style={{
                        filter: theme.palette.mode === 'dark' && 'invert(1)',
                      }}
                    />
                    <Typography color='text.primary'>{genre.name}</Typography>
                  </Stack>
                ))}
              </Stack>
              {/* Overview */}
              <Box>
                <Typography
                  mb={1}
                  variant='subtitle2'
                  color='text.primary'
                  fontSize={20}
                >
                  Overview
                </Typography>
                <Typography color='text.secondary'>{data?.overview}</Typography>
              </Box>
              {/* Top Cast */}
              <Box>
                <Typography
                  mb={1}
                  variant='subtitle2'
                  fontSize={20}
                  color='text.primary'
                >
                  Top Cast
                </Typography>

                <Swiper
                  pagination={{
                    clickable: true,
                  }}
                  grabCursor
                  slidesPerView={1}
                  spaceBetween={10}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                  modules={[Pagination]}
                  className='mySwiper'
                >
                  {data?.credits.cast.slice(0, 6).map((actor) => (
                    <SwiperSlide key={actor.id}>
                      <ActorCard actor={actor} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Loading>

      {/* Recommendations Section */}
      <Box>
        {(isLoadingRecommendedMovies ||
          recommendedMovies?.results.length > 0) && (
          <Typography
            variant='h4'
            color='text.primary'
            textAlign='center'
            mx='auto'
            width='fit-content'
            mb={2}
            padding={1}
            borderRadius={2}
            border='2px solid indianred'
          >
            You might also like
          </Typography>
        )}
        <Loading
          isLoading={isLoadingRecommendedMovies}
          isError={isErrorRecommendedMovies}
          error={ErrorRecommendedMovies}
          spinner={<MoviesSkeletonGrid numberOfSkeletons={12} />}
        >
          <Grid container spacing={3}>
            <RenderList
              data={recommendedMovies?.results}
              renderItem={(movie, index) => (
                <Grid xs={12} md={4} lg={3} xl={2.4} key={movie.id}>
                  <MovieCard movie={movie} index={index} />
                </Grid>
              )}
            />
          </Grid>
        </Loading>
      </Box>
    </>
  );
}
export default MoviePage;
