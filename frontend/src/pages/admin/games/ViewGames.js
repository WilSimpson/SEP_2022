import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper } from "@mui/material"
import GamesTable from '../../../components/admin/GamesTable';
import gameService from '../../../services/game.service';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';
import { alertService, alertSeverity } from '../../../services/alert.service';
import Loading from '../../../components/layout/loading';
import { useNavigate } from 'react-router';

export default function ViewGamesPage() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleAcceptConfirmDelete = (id) => {
    gameService.deleteGame(confirmationDeleteID).then(
      (success) => {
        handleCloseConfirmation()
        alertService.alert({ severity: alertSeverity.success, message: 'Game successfully deleted' })
        setGames(games.filter((game) => game.id != id))
        navigate("/admin-dashboard/games")
      }, (error) => {
        alertService.alert({ severity: alertSeverity.error, message: error.message })
      })
  };

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
              <GamesTable
                data={games}
                onConfirmDelete={handleAcceptConfirmDelete}
                onEdit={id => navigate(`/admin-dashboard/games/${id}`) }
              />
            </Grid>
          </Grid>
        </Container>
      </Loading>
    </AuthenticatedLayout >
  );
}