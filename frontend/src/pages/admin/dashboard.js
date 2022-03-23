import * as React from 'react';
import {
  Container,
  Button,
  Tooltip,
  Grid,
  Paper,
  Typography,
  Link,
  Table,
  IconButton,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import {gameSessions} from '../../helpers/dummyData';
import gameService from '../../services/game';
import GamesTable from '../../components/admin/gamesTable';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';
import Loading from '../../components/layout/loading';
import {alertService, alertSeverity} from '../../services/alert';

export function GameSessionTable() {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" gutterBottom>
        Active Game Sessions
      </Typography>
      <Table size="small" data-testid="active-game-sessions">
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
                <Tooltip title="Download QR Code">
                  <IconButton size="large">
                    <DownloadIcon />
                  </IconButton>
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
  const [games, setGames] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function getGames() {
      const resp = await gameService.getGames().catch((error) => {
        alertService.alert({severity: alertSeverity.error, message: error});
      });
      const games = [...resp.data];
      setGames(games);
      setLoading(false);
    }
    getGames();
  }, []);

  return (
    <AuthenticatedLayout>
      <Loading loading={loading}>
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                elevation={7}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <GamesTable data={games} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                elevation={7}
                data-testid="total-games"
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <React.Fragment>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Total Games
                  </Typography>
                  <Typography component="p" variant="h4">
                    {games.length}
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
              <Paper
                elevation={7}
                sx={{p: 2, display: 'flex', flexDirection: 'column'}}
              >
                <GameSessionTable />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Loading>
    </AuthenticatedLayout>
  );
}