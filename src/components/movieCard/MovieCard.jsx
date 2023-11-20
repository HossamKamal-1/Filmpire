import {
  Rating,
  Typography,
  Tooltip,
  Box,
  Stack,
  Chip,
  Button,
  Avatar,
  Grow,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { MovieTitle } from './styles';
import posterNotFoundImg from '../../assets/images/notfoundposter.png';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryOrGenreId } from '../../redux/features/movies/moviesSlice';
import genresIconsCollection from '../../assets/genres';
import { LazyImage } from '../';
function MovieCard({ movie }) {
  const genresList = useSelector((globalState) => globalState.movies.allGenres);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleChipClick(genreName, genreId) {
    navigate(`/?genre=${genreName}`);
    dispatch(setCategoryOrGenreId(genreId));
  }
  return (
    <Grow in timeout={200} style={{ transformOrigin: '0 0 0 0' }}>
      <Box>
        <Box
          position='relative'
          sx={{
            '&:hover .overlay': {
              opacity: '1',
              visibility: 'visible',
              boxShadow: '2px 2px 7px 0px #000000d6',
            },
            fontSize: '0',
          }}
        >
          <LazyImage
            alt={movie.title}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : posterNotFoundImg
            }
            style={{
              width: '100%',
              borderRadius: '8px',
              aspectRatio: '1/1.3',
              objectFit: 'cover',
              backgroundColor: 'gray',
            }}
          />
          <Box
            className='overlay'
            position='absolute'
            top='0'
            left='0'
            width='100%'
            height='100%'
            bgcolor='rgba(0,0,0,0.8)'
            zIndex='1000'
            borderRadius='8px'
            sx={{
              backdropFilter: 'blur(2px)',
              opacity: '0',
              transition: 'opacity 0.3s ease-in, box-shadow 0.4s ease-in ',
            }}
            padding='18px 8px'
          >
            <Typography variant='body1' color='white'>
              <Typography
                component='span'
                color='primary.main'
                mr='5px'
                fontWeight='bold'
              >
                Original Language:
              </Typography>
              {movie.original_language}
            </Typography>
            <Typography
              variant='body1'
              color='white'
              sx={{
                WebkitLineClamp: { xs: 5, md: 3 },
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                display: '-webkit-box',
              }}
            >
              <Typography
                component='span'
                color='primary.main'
                mr='5px'
                fontWeight='bold'
              >
                Overview:
              </Typography>
              {movie.overview}
            </Typography>
            <Typography variant='body1' color='white'>
              <Typography
                component='span'
                color='primary.main'
                mr='5px'
                fontWeight='bold'
              >
                Release Date:
              </Typography>
              {movie.release_date || 'Unknown'}
            </Typography>
            {genresList && (
              <>
                <Typography variant='body1' color='white'>
                  <Typography
                    component='span'
                    color='primary.main'
                    mr='5px'
                    fontWeight='bold'
                  >
                    Genres:
                  </Typography>
                  <br />
                </Typography>
                <Stack
                  direction='row'
                  gap={1}
                  flexWrap='wrap'
                  alignItems='center'
                  justifyContent='center'
                >
                  {movie.genre_ids?.slice(0, 3).map((genreId) => {
                    const genreName = genresList.find(
                      ({ id }) => id === genreId
                    ).name;
                    return (
                      <Chip
                        key={genreName}
                        label={genreName}
                        color='secondary'
                        sx={{ fontWeight: 'bold', p: '10px 5px', gap: 0.5 }}
                        variant='outlined'
                        size='small'
                        avatar={
                          <Avatar
                            alt='genre'
                            imgProps={{
                              sx: {
                                filter: 'invert(100%)',
                              },
                            }}
                            sx={{
                              background: 'transparent !important',
                            }}
                            src={genresIconsCollection[genreName]}
                          />
                        }
                        onClick={() => handleChipClick(genreName, genreId)}
                      />
                    );
                  })}
                </Stack>
              </>
            )}
            <Box textAlign='center' mt={1}>
              <Button
                component={Link}
                to={`/movie/${movie.id}`}
                variant='contained'
                size='small'
              >
                Visit Movie
              </Button>
            </Box>
          </Box>
        </Box>

        <Tooltip
          title={`Rating:  ${movie.vote_average / 2} / 5`}
          disableInteractive
          disableTouchListener={true}
        >
          <Box textAlign='center' mt={1}>
            <Rating
              name='half-rating-read'
              value={movie.vote_average / 2}
              precision={0.1}
              readOnly
            />
          </Box>
        </Tooltip>

        {movie.title.length >= 22 ? (
          <Tooltip title={movie.title} disableTouchListener={true}>
            <MovieTitle
              variant='h5'
              component={Link}
              to={`/movie/${movie.id}`}
              sx={{ textDecoration: 'none' }}
              color='GrayText'
            >
              {movie.title}
            </MovieTitle>
          </Tooltip>
        ) : (
          <MovieTitle
            variant='h5'
            component={Link}
            to={`/movie/${movie.id}`}
            sx={{ textDecoration: 'none' }}
            color='GrayText'
          >
            {movie.title}
          </MovieTitle>
        )}
      </Box>
    </Grow>
  );
}
export default MovieCard;
