import * as React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';
import gameService from '../../services/game';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import GameSessionsTable from '../../components/faculty/gameSessionsTable.tsx';
import gameSessionService from '../../services/gameSession';
import {alertService, alertSeverity} from '../../services/alert';
import CoursesTable from '../../components/faculty/coursesTable';

export default function FacultyDash() {
  const [sessions, setSessions] = React.useState([]);
  const navigate = useNavigate();

  const handleQRCodeButtonClicked = (joinCode) => {
    navigate(`/generate-qr?joinCode=${joinCode}`);
  };

  useEffect(() => {
    async function getGames() {
      gameService.getGames().then((resp) => {
        const games = [...resp.data];
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
          <Grid item xs={12}>
            <Paper
              elevation={7}
              sx={{
                p: 2, display: 'flex', flexDirection: 'column',
                overflowX: 'auto',
              }}
            >
              <GameSessionsTable
                qrCodes
                endGameSessionButtons
                onQRCodeButtonClicked={handleQRCodeButtonClicked}
                gameSessions={sessions}
                onConfirmEnd = {onConfirmEnd}
                onReportButtonClicked={(id) => navigate('/reports/8/view/?ids='+id)}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
