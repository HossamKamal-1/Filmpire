import { useSelector } from 'react-redux';
import { isAuthenticatedSelector } from '../../redux/features/auth/authSlice';
import { Typography } from '@mui/material';

function withGuard(ComponentToBeGuarded) {
  const GuardedComponent = () => {
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    if (isAuthenticated) {
      return <ComponentToBeGuarded />;
    }
    return (
      <Typography
        textAlign='center'
        color='text.primary'
        fontWeight='bold'
        component='p'
      >
        Unauthenticated user, please login first
      </Typography>
    );
  };
  return GuardedComponent;
}
export default withGuard;
