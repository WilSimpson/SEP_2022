import * as React from 'react';
import { AdminSideMenu } from './AdminSideMenu';
import { Box, Button, ThemeProvider, StyledEngineProvider, Tooltip } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
import { Table } from '@mui/material';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { TableHead, TableRow, TableCell, TableBody,  } from '@mui/material';
import { gameSessions, games } from './temp-dummyData';

function GameSessionTable() {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" gutterBottom>
          Active Game Sessions
      </Typography>
      <Table size="small"  data-testid='active-game-sessions'>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Game Code</TableCell>
            <TableCell>View Reports</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gameSessions.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Tooltip title='Download QR Code'>
                  <IconButton size="large"><DownloadIcon /></IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.starttime}</TableCell>
              <TableCell>{row.endtime}</TableCell>
              <TableCell>{row.gamecode}</TableCell>
              <TableCell>
                <Button variant="outlined">Reports</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

function GameTable() {
  return (
  <React.Fragment>
    <Typography component="h2" variant="h6" gutterBottom>
        All Games
    </Typography>
    <Table size="small" data-testid='all-games'>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Active?</TableCell>
          <TableCell>Creator</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {games.map((grow) => (
          <TableRow key={grow.id}>
            <TableCell>{grow.name}</TableCell>
            <TableCell>{grow.active}</TableCell>
            <TableCell>{grow.creator}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </React.Fragment>);
}


export default function AdminDash () {

  return (
    <StyledEngineProvider injectFirst>
      <div>
        <Box sx={{ display: 'flex' }}>
          <AdminSideMenu />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    elevation={7}
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <GameTable />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                  elevation={7}
                  data-testid='total-games'
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <React.Fragment>
                      <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Total Games
                      </Typography>
                      <Typography component="p" variant="h4">
                        2
                      </Typography>
                      <div>
                        <Link color="primary" href="#">
                          View Games
                        </Link>
                      </div>
                    </React.Fragment>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={7} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <GameSessionTable />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </div>
    </StyledEngineProvider>
  );
}
