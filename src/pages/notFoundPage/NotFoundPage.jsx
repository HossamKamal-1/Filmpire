import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Stack
      height='calc(100vh - 64px - 32px)'
      justifyContent='center'
      textAlign='center'
      alignItems='center'
      gap={3}
      color='error.main'
    >
      <Typography variant='h5'>Page Not Found</Typography>
      <Typography>
        404
        <br />
        The page you tried to visit is not found, please check url.
        <br />
        Or instead
      </Typography>
      <Button component={Link} to='/' replace>
        Move to homepage
      </Button>
    </Stack>
  );
}
export default NotFoundPage;
