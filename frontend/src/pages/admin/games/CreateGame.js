import React from 'react';
import { Container, Grid, Paper, Toolbar } from "@mui/material"
import GameFields from '../../../components/admin/GameFields';
import gameService from '../../../services/game.service';
import { useNavigate } from 'react-router-dom';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';


export default function CreateGamePage() {
  const navigate = useNavigate();

  function handleCancel() {
    navigate('/admin-dashboard/games')
  }

  function handleSubmit(name, json) {
    gameService.createGame(name, json)
    navigate('/admin-dashboard/games')
  }

  return (
    <AuthenticatedLayout>
      <Toolbar />
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