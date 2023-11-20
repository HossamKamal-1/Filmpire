import { useEffect } from 'react';
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  useMediaQuery,
} from '@mui/material';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import logo from '../../assets/images/logo.png';
import logo2 from '../../assets/images/logo2.png';
import { CustomDrawer, DRAWER_WIDTH } from './styles';
import { RenderList, Loading } from '../';
import genresIconsCollection from '../../assets/genres';
import categoriesIconsCollection from '../../assets/categories';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentCategoryOrGenreSelector,
  setCategoryOrGenreId,
  useGetAvailableGenresQuery,
} from '../../redux/features/movies/moviesSlice';
import { clearSearchParams } from '../../utils';
const categoriesLinks = [
  {
    value: 'popular',
    name: 'Popular',
  },
  {
    value: 'top_rated',
    name: 'Top Rated',
  },
  {
    value: 'upcoming',
    name: 'Upcoming',
  },
  {
    value: 'now_playing',
    name: 'Now Playing',
  },
];
function Sidebar({ handleDrawerClose, mobileOpen }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, isLoading, isError, error } = useGetAvailableGenresQuery();
  const isMobileMedia = useMediaQuery('(max-width:599px)');
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategoryOrId = useSelector(currentCategoryOrGenreSelector);
  const dispatch = useDispatch();
  const currentCategoryFromSearchParam = searchParams
    .get('category')
    ?.toLowerCase();
  const currentGenreNameFromSearchParam = searchParams
    .get('genre')
    ?.toLowerCase();
  function handleSidebarLinkClick(categoryOrGenre, genreId) {
    if (isMobileMedia) {
      handleDrawerClose();
    }
    if (location.pathname !== '/') {
      navigate(`/?${genreId ? 'genre' : 'category'}=${categoryOrGenre}`);
    } else {
      clearSearchParams(searchParams);
      searchParams.set(
        `${genreId ? 'genre' : 'category'}`,
        categoryOrGenre.toLowerCase()
      );
      setSearchParams(searchParams);
    }
    dispatch(setCategoryOrGenreId(genreId ? genreId : categoryOrGenre));
  }
  function handleLogoClick() {
    dispatch(setCategoryOrGenreId('popular'));
  }

  useEffect(() => {
    if (
      location.pathname === '/' &&
      currentCategoryFromSearchParam &&
      currentCategoryFromSearchParam !== 'popular'
    ) {
      dispatch(setCategoryOrGenreId(currentCategoryFromSearchParam));
    }
  }, []);
  useEffect(() => {
    if (
      location.pathname === '/' &&
      data?.genres &&
      currentGenreNameFromSearchParam
    ) {
      const currentGenreId = data.genres.find(
        ({ name }) => name.toLowerCase() === currentGenreNameFromSearchParam
      )?.id;
      if (currentGenreId !== undefined) {
        dispatch(setCategoryOrGenreId(currentGenreId));
      }
    }
  }, [data?.genres]);
  const drawerContent = (
    <div>
      <Link
        to='/?category=popular'
        style={{ display: 'block', textAlign: 'center', padding: '15px 0' }}
        onClick={handleLogoClick}
      >
        <img
          src={theme.palette.mode === 'light' ? logo2 : logo}
          alt='logo'
          style={{
            width: '70%',
            filter:
              theme.palette.mode === 'dark'
                ? 'brightness(0) saturate(100%) invert(40%) sepia(90%) saturate(2958%) hue-rotate(345deg) brightness(101%) contrast(101%)'
                : '',
          }}
        />
      </Link>
      <Divider />
      <List subheader={<li />}>
        <ul style={{ padding: '0' }}>
          <ListSubheader>Categories</ListSubheader>
          <RenderList
            data={categoriesLinks}
            renderItem={({ name, value }) => (
              <ListItem
                key={name}
                disablePadding
                sx={{
                  bgcolor:
                    currentCategoryOrId === value ||
                    (value === 'popular' &&
                      currentCategoryOrId === '' &&
                      location.pathname === '/')
                      ? 'primary.main'
                      : '',
                  color: 'inherit',
                }}
                onClick={() => handleSidebarLinkClick(value)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={categoriesIconsCollection[value]}
                      alt='category'
                      style={{
                        width: '30px',
                        filter: theme.palette.mode === 'dark' && 'invert(1)',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            )}
          />
        </ul>
      </List>
      <Divider />
      <List subheader={<li />}>
        <ul style={{ padding: '0' }}>
          <ListSubheader>Genres</ListSubheader>
          <Loading
            isLoading={isLoading}
            isError={isError}
            error={error}
            spinner={
              <Stack justifyContent='center' flexDirection='row'>
                <CircularProgress />
              </Stack>
            }
          >
            <RenderList
              data={data?.genres}
              renderItem={({ name, id }) => (
                <ListItem
                  key={name}
                  disablePadding
                  sx={{
                    bgcolor: currentCategoryOrId === id ? 'primary.main' : '',
                    // currentCategoryOrId === name.toLowerCase()
                    color: 'inherit',
                  }}
                  onClick={() => handleSidebarLinkClick(name, id)}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <img
                        src={genresIconsCollection[name]}
                        alt='genre'
                        style={{
                          width: '30px',
                          filter:
                            theme.palette.mode === 'dark' &&
                            'invert(100%) sepia(2%) saturate(552%) hue-rotate(342deg) brightness(117%) contrast(100%)',
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              )}
            />
          </Loading>
        </ul>
      </List>
    </div>
  );
  return (
    <Box
      component='nav'
      sx={{
        width: { sm: DRAWER_WIDTH },
      }}
      aria-label='Categories Links'
    >
      {!isMobileMedia ? (
        <CustomDrawer variant='permanent' open>
          {drawerContent}
        </CustomDrawer>
      ) : (
        <CustomDrawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{
            sx: {
              backgroundImage: 'none',
            },
          }}
        >
          {drawerContent}
        </CustomDrawer>
      )}
    </Box>
  );
}

export default Sidebar;
