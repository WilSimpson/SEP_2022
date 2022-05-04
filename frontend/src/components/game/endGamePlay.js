import {Button, Typography} from '@mui/material';
import React from 'react';

export default function EndGamePlay(props) {
  return (
    <>
      <Typography variant='h2' component='div' marginTop={5} gutterBottom>
          Thank you for playing
      </Typography>
      <img
        src='/images/logoLarge.png'
        alt="Ethics Adventure"
        style={{flex: 1, width: '100%', height: undefined}}
      />
      <Typography variant='h4' component='div' marginTop={5} gutterBottom>
          Your game path has been recorded!
      </Typography>
      <Button
        variant='contained'
        onClick={props.returnHome}
        data-testid='return-home'
      >
          Return Home
      </Button>
    </>
  );
}
