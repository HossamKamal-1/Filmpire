import { Box, Skeleton } from '@mui/material';

function MovieSkeleton() {
  return (
    <Box>
      <Skeleton variant='rounded' height={250} />
      <Skeleton
        variant='rounded'
        width='70%'
        sx={{ marginX: 'auto', marginTop: '10px' }}
      />
      <Skeleton variant='text' width='95%' sx={{ marginX: 'auto' }} />
    </Box>
  );
}
export default MovieSkeleton;
