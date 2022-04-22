import React from 'react';
import {Container, Grid, Paper} from '@mui/material';
import GameFields from '../../../components/admin/gameFields';
import gameService from '../../../services/game';
import {useNavigate} from 'react-router-dom';
import AuthenticatedLayout
  from '../../../components/layout/authenticated.layout';
import {alertService, alertSeverity} from '../../../services/alert';

export default function CreateGamePage() {
  const navigate = useNavigate();

  function handleCancel() {
    alertService.alert({
      severity: alertSeverity.info,
      message: 'Game not created',
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
    gameService
        .createGame(title, active, creatorId, code, questionsJSON, optionsJSON)
        .then(
            (success) => {
              alertService.alert({
                severity: alertSeverity.success,
                message: 'Game created',
              });
              navigate('/admin-dashboard/games');
            },
            (error) => {
              alertService.alert({
                severity: alertSeverity.error,
                message: error.message,
              });
            },
        );
  }

  return (
    <AuthenticatedLayout>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} component={Paper} sx={{p: '1.5rem'}}>
            <GameFields onCancel={handleCancel} onSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
