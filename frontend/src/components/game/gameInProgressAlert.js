import {Alert, Button} from '@mui/material';
import React from 'react';
export default function GameInProgressAlert(props) {
  return (
    <Alert
      severity="info"
      variant="outlined"
      action={
        <Button color="success" variant="contained" size="large">
          JOIN
        </Button>
      }
    >
      You have a game currently in progress. Would you like to join this game?
    </Alert>
  );
}
