import React from 'react';
import { Container, Grid, Paper, Toolbar } from "@mui/material"
import GamesTable from '../../../components/admin/GamesTable';
import gameService from '../../../services/game.service';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';

export default function ViewGamesPage() {
  return (
    <AuthenticatedLayout>
      <Toolbar />
      <Container maxWidth="lg" >
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12} component={Paper}>
            <GamesTable data={gameService.getGames()} />
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout >
  );
}