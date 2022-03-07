import React from 'react';
import { Container, Grid, Paper, Toolbar } from "@mui/material"
import GameFields from '../../../components/admin/GameFields';
import gameService from '../../../services/game.service';
import { useNavigate } from 'react-router-dom';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';
import { alertService, alertSeverity } from '../../../services/alert.service';


export default function CreateGamePage() {
  const navigate = useNavigate();

  function handleCancel() {
    alertService.alert({ severity: alertSeverity.info, message: "Game not created" })
    navigate('/admin-dashboard/games')
  }

  function handleSubmit(title, active, creator_id, code, questionsJSON, optionsJSON) {
    console.log('code', code)
    gameService.createGame(title, active, creator_id, code, questionsJSON, optionsJSON).then((success) => {
      alertService.alert({ severity: alertSeverity.success, message: "Game created" })
      navigate('/admin-dashboard/games')
    }, (error) => {
      alertService.alert({ severity: alertSeverity.error, message: error.message })
    })
  }

  return (
    <AuthenticatedLayout>
      <Container maxWidth="lg" >
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12} component={Paper}>
            <GameFields onCancel={handleCancel} onSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout >
  );
}