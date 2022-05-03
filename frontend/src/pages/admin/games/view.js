import React, {useEffect, useState} from 'react';
import {Container, Grid, Paper} from '@mui/material';
import GamesTable from '../../../components/admin/gamesTable';
import gameService from '../../../services/game';
import AuthenticatedLayout
  from '../../../components/layout/authenticated.layout';
import {alertService, alertSeverity} from '../../../services/alert';
import Loading from '../../../components/layout/loading';
import {useNavigate} from 'react-router-dom';

export default function ViewGamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleAcceptConfirmDelete = (id) => {
    gameService.deleteGame(id).then(
        (success) => {
          alertService.alert({
            severity: alertSeverity.success,
            message: 'Game successfully deleted',
          });
          setGames(games.filter((game) => game.id != id));
          navigate('/dashboard/games');
        }).catch((error) => {
      alertService.alert({
        severity: alertSeverity.error,
        message: error.message,
      });
    },
    );
  };

  useEffect(() => {
    async function getGames() {
      await gameService.getGames().then(
          (resp) => {
            const games = [...resp.data];
            setGames(games);
            setLoading(false);
          })
          .catch((error) => {
            alertService.alert({severity: alertSeverity.error, message: error});
          });
    }
    getGames();
  }, []);

  return (
    <AuthenticatedLayout>
      <Loading loading={loading}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} component={Paper} sx={{m: '3rem 0 0 2rem'}}>
              <GamesTable
                editable
                data={games}
                onConfirmDelete={handleAcceptConfirmDelete}
                onEdit={(id) => navigate(`/dashboard/games/${id}`)}
                onGameSelected={() => {}}
              />
            </Grid>
          </Grid>
        </Container>
      </Loading>
    </AuthenticatedLayout>
  );
}
