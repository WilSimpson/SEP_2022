import {Container, FormGroup, FormLabel, Grid, Paper, TextField} from '@mui/material';
import React from 'react';
import {useParams} from 'react-router';
import GameSessionsTable from '../../../components/faculty/gameSessionsTable.tsx';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';
import gameSessionService from '../../../services/gameSession';

export default function ReportPage(props) {
  const {id} = useParams();
  const [sessions, setSessions] = React.useState([]);
  // const [selectedSessions, setSelectedSessions] = React.useState([]);
  // const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function getSessions() {
      const resp = await gameSessionService.getSessions(id).catch((error) => {
        alertService.alert({severity: alertSeverity.error, message: error});
      });
      setSessions(resp.data);
    }
    getSessions();
  }, []);

  return (
    <AuthenticatedLayout>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              elevation={7}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'auto',
              }}
            >
              <h2>Generating Report for Game {id}</h2>
              <Grid container spacing={2} sx={{pl: 2, pr: 2, pb: 2}}>
                <Grid item xs={12}>
                  <h4>Filters</h4>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormLabel>
                      Label
                    </FormLabel>
                    <TextField />
                  </FormGroup>
                </Grid>
              </Grid>
              <GameSessionsTable
                gameSessions={sessions}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
