import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const ActorCard = forwardRef(function ActorCard({ actor }, ref) {
  return (
    <Card
      sx={{
        textDecoration: 'none',
        display: 'block',
      }}
      component={Link}
      to={`/actors/${actor.id}`}
      ref={ref}
    >
      <CardMedia
        component='img'
        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
        alt='actor'
      />
      <CardContent>
        <Typography gutterBottom variant='subtitle2'>
          {actor.character}
        </Typography>
        <Typography color='text.secondary' variant='subtitle1'>
          {actor.original_name}
        </Typography>
      </CardContent>
    </Card>
  );
});
export default ActorCard;
