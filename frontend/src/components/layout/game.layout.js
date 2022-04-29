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
      <Grid container justifyContent="center" spacing={2} xs={{overflow: 'auto'}}>
        <Grid item xs={6}>
          <PageAlert />
        </Grid>
      </Grid>
      {props.children}
      <StickyFooter />
    </>
  );
}
