import {CircularProgress, Grid} from '@mui/material';
import React from 'react';

export default function Loading(props) {
  return props.loading ? (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{minHeight: '100vh'}}
    >
      <Grid item xs={3}>
        <CircularProgress />
      </Grid>
    </Grid>
  ) : (
    props.children
  );
}
