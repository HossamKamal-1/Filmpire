import { useSelector } from 'react-redux';
import withGuard from '../../utils/hoc/withGuard';
import { authSelector } from '../../redux/features/auth/authSlice';
import { Box, Grid, Typography } from '@mui/material';
import {
  RenderList,
  Loading,
  MovieCard,
  MoviesSkeletonGrid,
} from '../../components';
import useProfilePage from './ProfilePage.hooks';
const ProfilePage = withGuard(function Profile() {
  const auth = useSelector(authSelector);
  const userListsInfo = useProfilePage(auth.userInfo.id, auth.sessionId);
  return (
    <Box>
      <Typography
        color='text.primary'
        fontSize={{
          xs: '20px',
          lg: '30px',
        }}
        textAlign='center'
        gutterBottom
      >
        {auth.userInfo.username} - profile page
      </Typography>
      {userListsInfo.map(({ title, requestInfo }, index) => (
        <Box
          key={title}
          marginBottom={index === userListsInfo.length - 1 ? 0 : 1}
        >
          <Typography color='text.secondary' variant='h5' gutterBottom>
            Your {title} Movies
          </Typography>
          <Loading
            isLoading={requestInfo.isLoading}
            isError={requestInfo.isError}
            error={requestInfo.error}
            spinner={<MoviesSkeletonGrid />}
          >
            {requestInfo.data?.results.length > 0 ? (
              <Grid container spacing={3}>
                <RenderList
                  data={requestInfo.data?.results}
                  renderItem={(movie, index) => (
                    <Grid xs={12} md={4} lg={3} xl={2.4} key={movie.id} item>
                      <MovieCard movie={movie} index={index} />
                    </Grid>
                  )}
                />
              </Grid>
            ) : (
              <Typography color='warning.main' px={1.5}>
                You have no {title} Movies
              </Typography>
            )}
          </Loading>
        </Box>
      ))}
    </Box>
  );
});
export default ProfilePage;
