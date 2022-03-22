import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, Grid} from '@mui/material';
import EndGameSession from '../../components/game/endGameSession';

export default function PlayGame() {
  const navigate = useNavigate();

  function returnHome() {
    navigate('/');
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <EndGameSession returnHome={returnHome}/>
        </Grid>
      </Grid>
    </Container>
  );
}
