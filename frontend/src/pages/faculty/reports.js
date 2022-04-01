import {Box, Container, Grid, Paper, Tab} from '@mui/material';
import React from 'react';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';
import {TabContext, TabList, TabPanel} from '@mui/lab';

const gameReports = (
  <>
    Game reports here
  </>
);

const sessionReports = (
  <>
    Session reports here
  </>
);

export default function ReportsPage() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AuthenticatedLayout>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              elevation={7}
              data-testid="totalCourses"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                overflowX: 'auto',
              }}
            >
              <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    variant="fullWidth"
                  >
                    <Tab label="Game Reports" value="1" />
                    <Tab label="Session Reports" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">{gameReports}</TabPanel>
                <TabPanel value="2">{sessionReports}</TabPanel>
              </TabContext>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
