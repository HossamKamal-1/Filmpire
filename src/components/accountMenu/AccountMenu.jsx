import { Logout } from '@mui/icons-material';
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyDeleteUserSessionQuery } from '../../redux/features/auth/authSlice';
import { useOpenSnackbar } from '../../contexts/snackbar/useOpenSnackbar';

function AccountMenu({ userInfo }) {
  const { openSnackbar } = useOpenSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [deleteUsersession] = useLazyDeleteUserSessionQuery();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  async function handleLogoutClick() {
    try {
      const data = await deleteUsersession().unwrap();
      if (data.success) {
        openSnackbar('Logged out successfully.', 'success', 1500);
      }
    } catch (e) {
      openSnackbar('Failed to logout, an error occurred.', 'error', 1500);
    }
  }
  return (
    <>
      <Tooltip title='Account settings'>
        <IconButton
          onClick={handleClick}
          size='small'
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={
              userInfo.avatar.tmdb.avatar_path
                ? `https://image.tmdb.org/t/p/w500${userInfo.avatar.tmdb.avatar_path}`
                : 'https://cdn5.vectorstock.com/i/1000x1000/43/94/default-avatar-photo-placeholder-icon-grey-vector-38594394.jpg'
            }
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} to={`/profile/${userInfo.id}`}>
          <Avatar
            src={
              userInfo.avatar.tmdb.avatar_path
                ? `https://image.tmdb.org/t/p/w500${userInfo.avatar.tmdb.avatar_path}`
                : 'https://cdn5.vectorstock.com/i/1000x1000/43/94/default-avatar-photo-placeholder-icon-grey-vector-38594394.jpg'
            }
          />
          {userInfo.username}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogoutClick}
          sx={{
            color: 'error.main',
            transition: '0.3s',
            '&:hover': {
              bgcolor: 'error.main',
              color: 'white',
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: 'inherit',
            }}
          >
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
export default AccountMenu;
