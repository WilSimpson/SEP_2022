import React from 'react';
import {Box, Grid, Toolbar} from '@mui/material';
import {PageAlert} from './alert';
import {SideMenu} from './sideMenu';
import {CssBaseline} from '@mui/material';
import ResponsiveAppBar from './nav';
// import ResponsiveAppBar from './nav';
// import DefaultLayout from './default.layout';
export default function AuthenticatedLayout(props) {
  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />
      <SideMenu>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ?
                theme.palette.grey[100] :
                theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={6}>
              <PageAlert />
            </Grid>
          </Grid>
          <Toolbar />
          {props.children}
        </Box>
      </SideMenu>
    </>
  );
}
