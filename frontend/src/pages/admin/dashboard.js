import * as React from 'react';
import {
  Button,
  Tooltip,
  Container,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Link,
  Table,
  IconButton,
  TextField,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import {TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import {useState} from 'react';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';
import GamesTable from '../../components/admin/gamesTable';
import gameService from '../../services/game';
import gameSessionService from '../../services/gameSession';
import Loading from '../../components/layout/loading';
import {useEffect} from 'react';
import {LinearProgress} from '@mui/material';
import {Box} from '@mui/system';
import AuthService from '../../services/auth';
import {Cancel} from '@material-ui/icons';

function GameSessionTable() {
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [confirmationEndID, setConfirmationEndID] = React.useState(null);

  useEffect(() => {
    gameSessionService.getMyActiveSessions(AuthService.currentUser().id).then(
        (response) => {
          console.log(response.data);
          setRows(response.data);
          setFilteredRows(response.data);
          setLoading(false);
        }).catch( (error) => {
      console.log(`There was an error ${error}`);
      setRows([]);
      setFilteredRows([]);
      setLoading(false);
    });
  }, []);

  const searchSession = (searchedVal) => {
    setFilteredRows(rows.filter((row) => {
      return Object.values(row).some((e) => e.toLowerCase()
          .includes(searchedVal.toLowerCase()));
    }));
  };

  const handleCloseConfirmation = () => {
    setConfirmationEndID(null);
  };

  const onConfirmEnd = () => {
    gameSessionService.endSession(confirmationEndID).then(
        (response) => {
          console.log(response.data);
        }).catch( (error) => {
      console.log(`There was an error ${error}`);
    });
    setConfirmationEndID(null);
  };

  return (
    <React.Fragment>
      <Dialog open={confirmationEndID != null}>
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to stop this game session?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ending a game session is permanent and this game session can no longer be used or viewed.
            A hidden copy will be kept kept in the database for logging and
            compilation of reports that used this game session.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onConfirmEnd(confirmationEndID)} autoFocus>
            End Permanently
          </Button>
          <Button onClick={handleCloseConfirmation} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Typography component="h2" variant="h6" gutterBottom>
        Active Game Sessions
      </Typography>
      <Box sx={{pb: 2}}>
        {loading && <LinearProgress />}
      </Box>
      <TextField
        label='Search by Session Code'
        onChange={(event) => searchSession(event.target.value)}
      />
      <Table size="small" data-testid="active-game-sessions">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Game Code</TableCell>
            <TableCell>View Reports</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Tooltip title="Download QR Code">
                  <IconButton size="large">
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.start_time}</TableCell>
              <TableCell>{row.end_time}</TableCell>
              <TableCell>{row.code}</TableCell>
              <TableCell>
                <Button variant="outlined">Reports</Button>
              </TableCell>
              <TableCell>
                <Tooltip title="End Game Session">
                  <IconButton
                    aria-label="end"
                    onClick={() => {
                      setConfirmationEndID(row.id);
                    }}
                  >
                    <Cancel />
                  </IconButton>
                </Tooltip>
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
