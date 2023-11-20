import { Typography, styled } from '@mui/material';

const MovieTitle = styled(Typography)((theme) => ({
  WebkitLineClamp: '1',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  display: '-webkit-box',
  textAlign: 'center',
}));

export { MovieTitle };
