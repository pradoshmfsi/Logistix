import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Menu, Divider } from '@mui/material';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '/Logistix_logo.png';
import { FONTSIZE, MARGIN, MENU, PADDING } from '../constants/styles';

const pages = ['Dashboard'];

function ResponsiveAppbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              textAlign: 'center',
              display: { xs: 'none', md: 'flex' },
              mr: 3,
            }}
          >
            <img
              src={logo}
              alt="Login"
              style={{ width: '100%', maxWidth: MENU.IMAGE_WIDTH }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="black">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: 'block',
                  md: 'none',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => navigate('/dashboard')}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              textAlign: 'center',
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            <img
              src={logo}
              alt="Login"
              style={{ width: '100%', maxWidth: MENU.IMAGE_WIDTH }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate('/dashboard')}
                sx={{
                  my: 2,
                  color: 'priar',
                  display: 'block',
                  fontSize: FONTSIZE.MEDIUM,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: MENU.MARGIN_TOP }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box
                sx={{
                  padding: PADDING.SMALL,
                  display: 'flex',
                  width: MENU.CARD_WIDTH,
                }}
              >
                <Avatar />
                <Box sx={{ flexGrow: 1, ml: MARGIN.SMALL }}>
                  <Typography>{user.name}</Typography>
                  <Typography sx={{ fontSize: FONTSIZE.SMALL }}>
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{
                  padding: PADDING.SMALL,
                  pt: 0,
                  display: 'flex',
                  alignItems: 'center',
                  mt: MARGIN.SMALL,
                }}
              >
                <LocationOnIcon
                  sx={{ color: (theme) => theme.palette.primary.main }}
                />{' '}
                <Typography sx={{ flexGrow: 1 }}>{user.location}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleCloseUserMenu();
                    handleLogout();
                  }}
                  sx={{ margin: 'auto' }}
                >
                  Logout
                </Button>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppbar;
