import React from 'react';
import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  Toolbar} from '@mui/material';


export default function GameNav() {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton href="/" sx={{p: 0}} size="large" data-testid='home-button'>
            <Avatar alt="EA" src='/images/logoSmall.png' variant="square" />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
