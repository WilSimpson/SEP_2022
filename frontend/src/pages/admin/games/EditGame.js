import React from 'react';
import { Container, Grid, Paper, Toolbar } from "@mui/material"
import GameFields from '../../../components/admin/GameFields';
import gameService from '../../../services/game.service';
import { useNavigate, useParams } from 'react-router-dom';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';

export default function EditGamePage(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const game = gameService.getGame(id)
  function handleCancel() {
    navigate('/admin-dashboard/games')
  }

  function handleSubmit(name, json, active) {
    gameService.updateGame(name, json, active)
    navigate('/admin-dashboard/games')
  }

  return (
    <AuthenticatedLayout>
      <Toolbar />
      <Container maxWidth="lg" >
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12} component={Paper}>
            <GameFields game={game} onCancel={handleCancel} onSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout >
  );
}