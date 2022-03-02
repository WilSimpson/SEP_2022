import React from 'react';
import { Box, Container, Grid, StyledEngineProvider, Paper } from "@mui/material"
import GamesTable from '../../../components/admin/GamesTable';
import { AdminSideMenu } from '../../../components/layout/AdminSideMenu';
import gameService from '../../../services/game.service';

export default function ViewGamesPage() {
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
                    <GamesTable data={gameService.getGames()}/>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </div>
      </StyledEngineProvider>
    );
}