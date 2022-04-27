import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, Grid} from '@mui/material';
import EndGamePlay from '../../components/game/endGamePlay';
import DefaultLayout from '../../components/layout/default.layout';

export default function EndGame() {
  const navigate = useNavigate();

  function returnHome() {
    navigate('/');
  }

  return (
    <DefaultLayout>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <EndGamePlay returnHome={returnHome}/>
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  );
}
