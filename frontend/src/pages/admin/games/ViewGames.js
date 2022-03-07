import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper } from "@mui/material"
import GamesTable from '../../../components/admin/GamesTable';
import gameService from '../../../services/game.service';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';
import { alertService, alertSeverity } from '../../../services/alert.service';
import Loading from '../../../components/layout/loading';

export default function ViewGamesPage() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getGames() {
      const resp = await gameService.getGames().catch((error) => {
        alertService.alert({ severity: alertSeverity.error, message: error })
      });
      const games = [...resp.data]
      setGames(games)
      setLoading(false)
    }
    getGames();
  }, [])

  return (
    <AuthenticatedLayout>
      <Loading loading={loading}>
        <Container maxWidth="lg" >
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} component={Paper}>
              <GamesTable data={games} />
            </Grid>
          </Grid>
        </Container>
      </Loading>
    </AuthenticatedLayout >
  );
}