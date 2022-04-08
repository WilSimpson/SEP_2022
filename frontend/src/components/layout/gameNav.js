import React from 'react';
import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  Toolbar} from '@mui/material';
import logoSmall from '../../images/logoSmall.png';


export default function GameNav() {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton href="/" sx={{p: 0}} size="large" data-testid='home-button'>
            <Avatar alt="EA" src={logoSmall} variant="square" />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
