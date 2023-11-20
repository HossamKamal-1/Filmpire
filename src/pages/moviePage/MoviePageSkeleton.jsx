import { Box, Grid, Skeleton, Stack } from '@mui/material';

function MoviePageSkeleton() {
  return (
    <>
      <Grid container marginBottom={1} spacing={4}>
        <Grid xs={12} md={5} item>
          {/* Poster Skeleton */}
          <Box>
            <Skeleton
              variant='rounded'
              sx={{ height: { xs: '550px', lg: 'calc(100vh - 64px - 24px)' } }}
            />
          </Box>
        </Grid>
        <Grid xs={12} md={7} item>
          <Stack gap={3}>
            {/* title */}
            <Box>
              <Skeleton
                variant='text'
                sx={{ fontSize: '3rem', transform: 'translateX(0)' }}
              />
              <Skeleton
                variant='text'
                sx={{ fontSize: '1rem', width: '70%', marginX: 'auto' }}
              />
            </Box>
            {/* rating */}
            <Stack
              direction='row'
              gap={2}
              justifyContent='center'
              flexWrap='wrap'
            >
              <Stack direction='row' spacing={1}>
                <Skeleton
                  variant='text'
                  sx={{ fontSize: '1rem' }}
                  width='100px'
                />
                <Skeleton
                  variant='text'
                  sx={{ fontSize: '1rem' }}
                  width='100px'
                />
              </Stack>
            </Stack>
            <Skeleton
              variant='text'
              sx={{ fontSize: '1rem', marginX: 'auto' }}
              width={100}
            />
            {/* Genre */}
            <Stack
              direction='row'
              justifyContent='space-around'
              flexWrap='wrap'
              gap={1}
              alignItems='center'
            >
              <Skeleton variant='rectangular' width={40} height={40} />
              <Skeleton variant='rectangular' width={40} height={40} />
            </Stack>
            {/* Overview */}
            <Box>
              <Skeleton
                variant='text'
                sx={{ fontSize: '1rem', marginBottom: '5px', width: '50%' }}
              />
              <Box>
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                <Skeleton
                  variant='text'
                  sx={{ fontSize: '1rem', width: '50%' }}
                />
              </Box>
            </Box>
            {/* Top Cast */}
            <Box>
              <Skeleton
                variant='text'
                sx={{ fontSize: '1rem', marginBottom: '5px', width: '50%' }}
              />
              <Stack direction={{ md: 'row' }} gap={2} alignItems='center'>
                {Array.from({ length: 4 }, (_, index) => (
                  <Skeleton
                    variant='rounded'
                    width={150}
                    height={168}
                    key={index}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
export default MoviePageSkeleton;
