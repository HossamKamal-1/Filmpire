import {
  Brightness7,
  AccountCircle,
  Search,
  Menu,
  Brightness4,
} from '@mui/icons-material';
import {
  AppBar,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { useToggleColorMode } from '../../contexts/colorMode/useColorMode';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../redux/features/movies/moviesSlice';
import {
  authSelector,
  useCreateSessionIdQuery,
  useGetUserInfoQuery,
  useLazyCreateRequestTokenQuery,
} from '../../redux/features/auth/authSlice';
import { useOpenSnackbar } from '../../contexts/snackbar/useOpenSnackbar';
import AccountMenu from '../accountMenu/AccountMenu';
import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
function Navbar({ handleDrawerOpen }) {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 400);
  const { openSnackbar } = useOpenSnackbar();
  const { toggleColorMode } = useToggleColorMode();
  const isMobileMedia = useMediaQuery('(max-width:599px)');
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestToken = localStorage.getItem('request_token');
  const { sessionId, isAuthenticated } = useSelector(authSelector);
  const needSessionId = requestToken && !sessionId;
  const [createRequestToken, { isFetching: isRequestTokenFetching }] =
    useLazyCreateRequestTokenQuery();
  // don't create new session if (request token doesn't exist or session id already exists)
  useCreateSessionIdQuery(requestToken, { skip: !needSessionId });
  const { data: userInfoData, isFetching: isUserInfoFetching } =
    useGetUserInfoQuery(sessionId, {
      skip: !sessionId,
    });
  // don't request for user info if (sessionId doesn't exist)
  useEffect(() => {
    if (debouncedSearchValue) {
      if (location.pathname !== '/search') {
        navigate(`search?q=${debouncedSearchValue.trim()}`);
      }
      dispatch(setSearchTerm(debouncedSearchValue));
    }
  }, [debouncedSearchValue, dispatch, navigate]);
  async function handleLoginClick() {
    try {
      const data = await createRequestToken().unwrap();
      if (data.success) {
        localStorage.setItem('request_token', data.request_token);
        location.assign(
          `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${location.origin}/approved`
        );
      }
    } catch (e) {
      openSnackbar(
        'Unable to login, please check your internet connection',
        'error',
        1500
      );
    }
  }

  function handleInputSearchChange(e) {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);
  }
  return (
    <AppBar position='sticky' color='default'>
      <Toolbar>
        {isMobileMedia && (
          <IconButton
            aria-label='open drawer'
            edge='start'
            onClick={() => handleDrawerOpen?.()}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
        )}
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          flex='1'
        >
          <IconButton sx={{ ml: 1 }} onClick={() => toggleColorMode()}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <TextField
            id='input-with-icon-textfield'
            label='Search'
            placeholder='Search Movies'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
            variant='standard'
            value={searchValue}
            onChange={handleInputSearchChange}
          />
          {!isAuthenticated ? (
            <Button
              sx={(theme) => ({
                color: theme.palette.grey[500],
                borderColor: theme.palette.grey[500],
              })}
              endIcon={
                <AccountCircle
                  sx={(theme) => ({ color: theme.palette.grey[500] })}
                />
              }
              onClick={handleLoginClick}
              disabled={isRequestTokenFetching || isUserInfoFetching}
            >
              {isRequestTokenFetching || isUserInfoFetching
                ? 'Loading'
                : 'Login'}
            </Button>
          ) : (
            <AccountMenu userInfo={userInfoData} />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
