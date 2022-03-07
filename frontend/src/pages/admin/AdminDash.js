import * as React from 'react';
import { SideMenu } from '../../components/layout/SideMenu';
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
import { TableHead, TableRow, TableCell, TableBody, } from '@mui/material';
import { gameSessions, Games } from '../../helpers/DummyData';
import gameService from '../../services/game.service'
import GamesTable from '../../components/admin/GamesTable';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';

function GameSessionTable() {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" gutterBottom>
        Active Game Sessions
      </Typography>
      <Table size="small" data-testid='active-game-sessions'>
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


export default function AdminDash() {

  return (
    <AuthenticatedLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9} >
            <Paper
              elevation={7}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <GamesTable data={gameService.getGames()} />
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
                  {gameService.getGames().length}
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
    </AuthenticatedLayout>
  );
}
