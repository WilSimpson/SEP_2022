import React, {useEffect} from 'react';
import {Container, Grid, Paper} from '@mui/material';
import GameFields from '../../../components/admin/GameFields';
import gameService from '../../../services/game.service';
import {useNavigate, useParams} from 'react-router-dom';
import AuthenticatedLayout
  from '../../../components/layout/authenticated.layout';
import {alertService, alertSeverity} from '../../../services/alert.service';
import Loading from '../../../components/layout/loading';

export default function EditGamePage(props) {
  const navigate = useNavigate();
  const {id} = useParams();
  const [game, setGame] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function getGame() {
      const resp = await gameService.getGame(id).catch(() => {
        notFound();
      });
      const game = resp.data;

      if (game === null) {
        notFound();
      }

      setGame(game);
      setLoading(false);
    }
    getGame();
  }, []);

  function notFound() {
    alertService.alert({
      severity: alertSeverity.warning,
      message: `Game ${id} not found`,
    });
    navigate('/admin-dashboard/games');
  }

  function handleCancel() {
    alertService.alert({
      severity: alertSeverity.info,
      message: 'Changes not saved',
    });
    navigate('/admin-dashboard/games');
  }

  function handleSubmit(
      title,
      active,
      creatorId,
      code,
      questionsJSON,
      optionsJSON,
  ) {
    setLoading(true);
    gameService
        .updateGame(
            id,
            title,
            active,
            creatorId,
            code,
            questionsJSON,
            optionsJSON,
        )
        .then(
            (success) => {
              alertService.alert({
                severity: alertSeverity.success,
                message: 'Changes saved',
              });
              navigate('/admin-dashboard/games');
            },
            (error) => {
              alertService.alert({
                severity: alertSeverity.error,
                message: error.message,
              });
              setLoading(false);
            },
        );
  }

  return (
    <AuthenticatedLayout>
      <Loading loading={loading}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} component={Paper}>
              <GameFields
                game={game}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
              />
            </Grid>
          </Grid>
        </Container>
      </Loading>
    </AuthenticatedLayout>
  );
}
