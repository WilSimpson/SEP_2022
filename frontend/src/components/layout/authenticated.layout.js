import React from 'react';
import {Box, Grid} from '@mui/material';
import {PageAlert} from './alert';
import {SideMenu} from './sideMenu';

export default function AuthenticatedLayout(props) {
  return (
    <>
      <SideMenu>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ?
                theme.palette.grey[100] :
                theme.palette.grey[900],
            flexGrow: 1,
            // height: '100vh',
            overflow: 'auto',
          }}
        >
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={6}>
              <PageAlert />
            </Grid>
          </Grid>
          {props.children}
        </Box>
      </SideMenu>
    </>
  );
}
