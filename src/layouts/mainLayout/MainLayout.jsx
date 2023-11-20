import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import { Navbar, Sidebar } from '../../components';
import { useState } from 'react';
function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Stack direction='row'>
      <Sidebar handleDrawerClose={handleDrawerToggle} mobileOpen={mobileOpen} />
      <Box flex='1'>
        <Navbar handleDrawerOpen={handleDrawerToggle} />
        <Box
          component='main'
          position='relative'
          py={2}
          bgcolor='background.paper'
          color='black'
          height={{ sm: 'calc(100vh - 64px)', xs: 'calc(100vh - 56px)' }}
          sx={[
            {
              overflowY: 'auto',
            },
            (theme) => ({
              '::-webkit-scrollbar': {
                width: '5px',
              },
              /* Track */
              '::-webkit-scrollbar-track': {
                background:
                  theme.palette.mode === 'light'
                    ? '#f1f1f1'
                    : theme.palette.background.paper,
                backgroundImage:
                  'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
                borderRadius: '4px',
              },
              /* Handle */
              '::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.primary.main,
                backgroundImage:
                  'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
                borderRadius: '4px',
              },
              /* Handle on hover */
              '::-webkit-scrollbar-thumb:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }),
          ]}
        >
          <Container maxWidth={false}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Stack>
  );
}

export default MainLayout;
