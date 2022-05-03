import React from 'react';
import {Container, Grid, Paper} from '@mui/material';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';
import CoursesTable from '../../components/faculty/coursesTable';

export default function ViewCoursePage() {
  return (
    <AuthenticatedLayout>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} component={Paper} sx={{p: '1.5rem'}}>
            <CoursesTable />
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
