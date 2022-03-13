import React from 'react';
import {CssBaseline, Grid} from '@mui/material';
import {PageAlert} from './alert';
import ResponsiveAppBar from './nav';
import StickyFooter from './footer';

export default function DefaultLayout(props) {
  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />
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
