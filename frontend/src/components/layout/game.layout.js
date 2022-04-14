import React from 'react';
import {CssBaseline, Grid} from '@mui/material';
import {PageAlert} from './alert';
import GameNav from './gameNav';
import StickyFooter from './footer';

export default function GameLayout(props) {
  return (
    <>
      <CssBaseline />
      <GameNav />
      <main>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={6}>
            <PageAlert />
          </Grid>
        </Grid>
        {props.children}
      </main>
      <StickyFooter />
    </>
  );
}
