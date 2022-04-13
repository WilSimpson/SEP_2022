import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import accountIcon from '../../images/accountIcon.png';
import logoSmall from '../../images/logoSmall.png';
import {ButtonGroup} from '@mui/material';
import authService from '../../services/auth';

// const pages = ['Get Started', 'About', 'Help'];

const pages = {'Get Started': 'started', 'About': '####', 'Help': '####'};

const settings = {
  'Dashboard': '/admin-dashboard',
  'Games': '/admin-dashboard/games',
  'Account Settings': '#',
  'Logout': '/logout',
};

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  function handleChooseUserOption(event, link) {
    setAnchorElUser(null);
  }

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton href="/" sx={{p: 0}} size="large">
            <Avatar alt="EA" src={logoSmall} variant="square" />
          </IconButton>
          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              data-testid="profileButton"
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
                display: {xs: 'block', md: 'none'},
              }}
            >
              {Object.entries(pages).map(([key, value]) => (
                <MenuItem key={key} href={value} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{key}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, pl: 3}}>
            <ButtonGroup disableElevation variant="contained" color="primary">
              {Object.entries(pages).map(([key, value]) => (
                <Button
                  key={key}
                  href={value}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    borderRadius: 0,
                  }}
                >
                  {key}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
          <Box sx={{flexGrow: 0}}>
            {authService.isLoggedIn() ? (
              <div>
                <Tooltip title="Account Menu">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{p: 0}}
                    size="large"
                    data-testid="user-menu"
                  >
                    <Avatar src={accountIcon} alt="User" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{mt: '45px'}}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  data-testid='auth-menu'
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
                  {Object.entries(settings).map(([name, link]) => (
                    <MenuItem
                      key={name}
                      data-testid={name+'-test'}
                      onClick={(e) => handleChooseUserOption(e, link)}
                    >
                      <Typography
                        textAlign="center"
                        variant='h1'
                      >
                        {name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ) : (
              <MenuItem
                key='Login'
              >
                <Button
                  key="Login"
                  href="/login"
                  sx={{my: 2, color: 'common.white', display: 'block'}}
                >
                  Login
                </Button>
              </MenuItem>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
