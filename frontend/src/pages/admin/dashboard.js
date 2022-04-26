import * as React from 'react';
import {
  Container,
  Grid,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import gameService from '../../services/game';
import gameSessionService from '../../services/gameSession';
import GamesTable from '../../components/admin/gamesTable';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';
import Loading from '../../components/layout/loading';
import {alertService, alertSeverity} from '../../services/alert';
import {useNavigate} from 'react-router-dom';
import GameSessionsTable from '../../components/faculty/gameSessionsTable.tsx';

export default function AdminDash() {
  const [games, setGames] = React.useState([]);
  const [sessions, setSessions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  const handleQRCodeButtonClicked = (joinCode) => {
    navigate(`/generate-qr?joinCode=${joinCode}`);
  };

  React.useEffect(() => {
    async function getGames() {
      gameService.getGames().then((resp) => {
        const games = [...resp.data];
        setGames(games);
        getSessions(games);
      }).catch((error) => {
        alertService.alert({severity: alertSeverity.error, message: error});
      });
    }

    async function getSessions(games) {
      for (const game of games) {
        gameSessionService.getSessions(game.id).then((resp) => {
          const filteredSessions = resp.data.filter(function(el) {// sets filteredSessions to all sessions in the response that have the "active" parameter set to true
            return el.active == true;
          });
          setSessions((oldSessions) => [...oldSessions, ...filteredSessions]);
        })
        .catch((error) => {
          alertService.alert({severity: alertSeverity.error, message: error});
        });
      }

      setLoading(false);
    }

    getGames();
  }, []);

  const onConfirmEnd = (id) => {
    gameSessionService.endSession(id).then(
        (response) => {
          setSessions([...sessions.filter((s) => s.id != id)]);
          console.log(response.data);
        }).catch((error) => {
          alertService.alert({severity: alertSeverity.error, message: error});
        });
  };

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
                <GamesTable
                  data={games}
                  onEdit={(id) => navigate(`/admin-dashboard/games/${id}`)}
                />
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
                <GameSessionsTable
                  reportButtons
                  qrCodes
                  onConfirmEnd = {onConfirmEnd}
                  onQRCodeButtonClicked={handleQRCodeButtonClicked}
                  gameSessions={sessions}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Loading>
    </AuthenticatedLayout>
  );
}
