import { Drawer, styled } from '@mui/material';

export const DRAWER_WIDTH = 240;

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  color: theme.palette.success.main,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    scrollbarGutter: 'stable',
    /* width */
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
    [theme.breakpoints.up('lg')]: {
      overflowY: 'hidden',
      '&:hover': {
        overflowY: 'auto',
      },
    },
  },
}));

export { CustomDrawer };
