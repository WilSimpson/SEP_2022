import {Container, Grid} from '@mui/material';
import React from 'react';

export default function SessionReports() {
  return (
    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h4>Filters</h4>
        </Grid>
      </Grid>
    </Container>
  );
};
