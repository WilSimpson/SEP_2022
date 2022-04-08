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
import {useNavigate} from 'react-router';
import GameSessionsTable from '../../components/faculty/gameSessionsTable.tsx';

export default function AdminDash() {
  const [games, setGames] = React.useState([]);
  const [sessions, setSessions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getGames() {
      const resp = await gameService.getGames().catch((error) => {
        alertService.alert({severity: alertSeverity.error, message: error});
      });
      const games = [...resp.data];
      setGames(games);
      getSessions(games);
    }

    async function getSessions(games) {
      for (const game of games) {
        const resp = await gameSessionService.getSessions(game.id).catch((error) => {
          alertService.alert({severity: alertSeverity.error, message: error});
        });
        setSessions((oldSessions) => [...oldSessions, ...resp.data]);
      }

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
