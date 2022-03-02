import React from 'react';
import { Box, Container, Grid, StyledEngineProvider, Paper } from "@mui/material"
import GameFields from '../../../components/admin/GameFields';
import { AdminSideMenu } from '../../../components/layout/AdminSideMenu';
import gameService from '../../../services/game.service';
import { useNavigate } from 'react-router-dom';


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
      <StyledEngineProvider injectFirst>
        <div>
          <Box sx={{ display: 'flex' }}>
          <AdminSideMenu />
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} lg={12}  component={Paper}>
                    <GameFields onCancel={handleCancel} onSubmit={handleSubmit}/>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </div>
      </StyledEngineProvider>
    );
}