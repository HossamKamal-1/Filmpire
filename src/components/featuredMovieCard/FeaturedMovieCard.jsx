import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function FeaturedMovieCard({ movie = {} }) {
  return (
    <Card
      sx={{
        mb: '15px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '430px',
        position: 'relative',
        textDecoration: 'none',
      }}
      component={Link}
      to={`movie/${movie.id}`}
    >
      <CardMedia
        image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        sx={{
          position: 'absolute',
          inset: '0',
          backgroundColor: 'rgba(0,0,0,0.75)',
          backgroundBlendMode: 'darken',
        }}
      />
      <CardContent sx={{ position: 'relative', maxWidth: { lg: '70%' } }}>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          sx={(theme) => ({
            color:
              theme.palette.mode === 'light'
                ? 'white'
                : theme.palette.text.primary,
          })}
        >
          {movie.title}
        </Typography>
        <Typography
          variant='body2'
          sx={(theme) => ({
            color:
              theme.palette.mode === 'light'
                ? '#f5f5f6bc'
                : theme.palette.text.secondary,
          })}
        >
          {movie.overview}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default FeaturedMovieCard;
