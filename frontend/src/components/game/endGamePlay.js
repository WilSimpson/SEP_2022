import {Button, Typography} from '@mui/material';
import React from 'react';
import DefaultLayout from '../layout/default.layout';
import logoLarge from '../../images/logoLarge.png';
export default function EndGamePlay(props) {
  return (
    <DefaultLayout>
      <Typography variant='h2' component='div' marginTop={5} gutterBottom>
          Thank you for playing
      </Typography>
      <img
        src={logoLarge}
        alt="Ethics Adventure"
        style={{flex: 1, width: '100%', height: undefined}}
      />
      <Typography variant='h4' component='div' marginTop={5} gutterBottom>
          Your game path has been recorded!
      </Typography>
      <Button variant='contained' onClick={props.returnHome} data-testid='return-home'>
          Return Home
      </Button>
    </DefaultLayout>
  );
}
