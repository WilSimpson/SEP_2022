import * as React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';
// import GamesTable from '../../components/admin/gamesTable';
import gameService from '../../services/game';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import GameSessionsTable from '../../components/faculty/gameSessionsTable.tsx';
import gameSessionService from '../../services/gameSession';
import {alertService, alertSeverity} from '../../services/alert';
import CoursesTable from '../../components/faculty/coursesTable';

export default function FacultyDash() {
  const [sessions, setSessions] = React.useState([]);
  // const [games, setGames] = React.useState([]);
  const navigate = useNavigate();

  const handleQRCodeButtonClicked = (joinCode) => {
    navigate(`/generate-qr?joinCode=${joinCode}`);
  };

  useEffect(() => {
    async function getGames() {
      gameService.getGames().then((resp) => {
        const games = [...resp.data];
        // setGames(games);
        getSessions(games);
      }).catch((error) => {
        alertService.alert({severity: alertSeverity.error, message: error});
      });
    }

    async function getSessions(games) {
      for (const game of games) {
        gameSessionService.getSessions(game.id)
            .then((resp) => {
              setSessions((oldSessions) => [...oldSessions, ...resp.data]);
            }, (error) => {
              alertService.alert({severity: alertSeverity.error, message: error});
            });
      }
    }
    getGames();
  }, []);

  return (
    <AuthenticatedLayout>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <Paper
              elevation={7}
              data-testid="totalCourses"
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 380,
                overflowX: 'auto',
                justifyContent: 'center',
              }}
            >
              <React.Fragment>
                <Typography
                  component="h2"
                  variant="h4"
                  color="primary"
                  gutterBottom
                >
                  Total Courses
                </Typography>
                <Typography component="p" variant="h2">
                  {sessionStorage.getItem('courses') ? JSON.parse(sessionStorage.getItem('courses')).length : 0}
                </Typography>
                {/* <div>
                  <Button color="secondary" variant="contained"
                    href="dashboard/addCourse"
                    data-testid="courses-button">
                    Add a Course
                  </Button>
                </div> */}
              </React.Fragment>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <Paper
              elevation={7}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 380,
                overflowX: 'auto',
              }}
            >
              <CoursesTable />
            </Paper>
          </Grid>
          {/* <Grid item xs={12} md={8} lg={9}>
            <Paper
              elevation={7}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
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
                justifyContent: 'center',
              }}
            >
              <React.Fragment>
                <Typography
                  component="h1"
                  variant="h4"
                  color="primary"
                  gutterBottom
                >
                  Total Games
                </Typography>
                <Typography component="p" variant="h2">
                  2
                </Typography>
                <div>
                  <Link color="primary" href="#">
                    View Games
                  </Link>
                </div>
              </React.Fragment>
            </Paper>
          </Grid> */}
          <Grid item xs={12}>
            <Paper
              elevation={7}
              sx={{
                p: 2, display: 'flex', flexDirection: 'column',
                overflowX: 'auto',
              }}
            >
              <GameSessionsTable
                reportButtons
                qrCodes
                onQRCodeButtonClicked={handleQRCodeButtonClicked}
                gameSessions={sessions}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
