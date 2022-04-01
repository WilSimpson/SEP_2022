import {Container, Grid, Paper} from '@mui/material';
import React from 'react';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';

export default function ReportsPage() {
  return (
    <AuthenticatedLayout>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <Paper
              elevation={7}
              data-testid="totalCourses"
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                overflowX: 'auto',
              }}
            >
              Report Page
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
