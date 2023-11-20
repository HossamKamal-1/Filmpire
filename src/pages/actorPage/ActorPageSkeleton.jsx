import { Box, Skeleton, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
const ActorPageSkeleton = () => (
  <>
    <Grid container justifyContent='center' spacing={3}>
      <Grid xs={12} md={6} lg={5}>
        <Skeleton
          variant='rectangular'
          sx={{
            height: {
              lg: '600px',
              xs: '200px',
            },
          }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={7} textAlign='center'>
        <Box>
          <Skeleton
            variant='text'
            width='50%'
            sx={{
              marginX: 'auto',
            }}
          />
          <Stack gap={2} mt={2}>
            <Skeleton variant='text' />
            <Skeleton variant='text' />
            <Skeleton variant='text' />
            <Skeleton variant='text' />
            <Skeleton variant='text' />
            <Skeleton variant='text' />
            <Skeleton variant='text' />
            <Skeleton
              variant='text'
              width='50%'
              sx={{
                marginX: 'auto',
              }}
            />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  </>
);
export default ActorPageSkeleton;
