import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, Grid} from '@mui/material';
import EndGamePlay from '../../components/game/endGamePlay';

export default function EndGame() {
  const navigate = useNavigate();

  function returnHome() {
    navigate('/');
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <EndGamePlay returnHome={returnHome}/>
        </Grid>
      </Grid>
    </Container>
  );
}
