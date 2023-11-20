import { Typography } from '@mui/material';

function Loading({
  isLoading,
  isError,
  error,
  spinner,
  children,
}) {
  if (isLoading) {
    return spinner;
  }
  if (isError) {
    return (
      <Typography variant='h5' p={1} color='GrayText' textAlign='center'>
        An error occured:{' '}
        <Typography
          component='span'
          color='indianred'
          border='1px solid indianred'
          borderRadius='5px'
          p={1}
        >
          {error.status}
        </Typography>
      </Typography>
    );
  }
  return <>{children}</>;
}
export default Loading;
