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
import accountIcon from '../images/accountIcon.png';
import logoSmall from '../images/logoSmall.png'
import { ButtonGroup } from '@mui/material';

//const pages = ['Get Started', 'About', 'Help'];

const pages = {'Get Started':'started', 'About':'####', 'Help':'####'};

const settings = ['Dashboard', 'Games', 'Account Settings', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let isLoggedIn = (localStorage.getItem('user') !== null);

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

  const LoggedInNav = (
    <div>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar alt="EA" src={logoSmall} variant='square' />
        </Toolbar>
      </Container>
    </div>
  );

  const LoggedOutNav = (
    <Container maxWidth="xl">
        <Toolbar disableGutters>
        <IconButton href='/' sx={{ p: 0 }} size="large">
            <Avatar alt="EA" src={logoSmall} variant='square' />
        </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              data-testid="profileButton"
              size="large">
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Object.entries(pages).map(([key,value]) => (

                <MenuItem key={key} href={value} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{key}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, pl:3 }}>
            <ButtonGroup disableElevation variant='contained' color='primary'>
            {Object.entries(pages).map(([key,value]) => (
              <Button
              key={key}
              href={value}
              onClick={handleCloseNavMenu}
              sx={{ my: 2,
                borderRadius: 0 }}
            >
              {key}
            </Button>
            ))}
            </ButtonGroup>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          {/* Replace with isLoggedIn */}
          {true ? (
        <div>
        <Tooltip title="Account Menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} size="large">
          <Avatar src={accountIcon} alt="User" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
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
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
      </div>
      ) : (
        <Button
              key="Login"
              href='#'
              sx={{ my: 2, color: 'primary', display: 'block' }}
            >
              Login
            </Button>
      )}
          </Box>
        </Toolbar>
      </Container>
  );

  return (
      <AppBar position="static" color='primary'>
        {isLoggedIn ? LoggedInNav : LoggedOutNav}
      </AppBar>    
  );
};
export default ResponsiveAppBar;
