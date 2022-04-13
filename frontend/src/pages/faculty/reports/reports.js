import {Container, Grid, Paper} from '@mui/material';
import React, {useEffect} from 'react';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';
import Loading from '../../../components/layout/loading';
import gameService from '../../../services/game';
import GamesTable from '../../../components/admin/gamesTable';
import {useNavigate} from 'react-router';
import {alertService, alertSeverity} from '../../../services/alert';

export default function ReportsPage() {
  const [games, setGames] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getGames() {
      gameService.getGames().then((resp) => {
        setGames([...resp.data]);
        setLoading(false);
      }).catch((error) => {
        alertService.alert({severity: alertSeverity.error, message: error});
      });
    }
    getGames();
  }, []);

  const handleGameSelected = (id) => {
    navigate('/reports/'+id);
  };

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
              <h2>Select Game</h2>
              <p>Select a game to generate a reports from</p>
              <Loading loading={loading}>
                <GamesTable
                  data={games}
                  onGameSelected={handleGameSelected}
                />
              </Loading>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
