import { Button, Stack, Typography } from '@mui/material';
import { Link, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const { status, data } = useRouteError();
  return (
    <Stack
      height='calc(100vh - 64px - 32px)'
      justifyContent='center'
      textAlign='center'
      alignItems='center'
      gap={3}
      color='error.main'
    >
      <Typography variant='h5'>Unexpected Error occurred</Typography>
      <Typography>
        {status}
        <br />
        {data}
      </Typography>
      <Button component={Link} to='/' replace>
        Move to homepage
      </Button>
    </Stack>
  );
}
export default ErrorPage;
