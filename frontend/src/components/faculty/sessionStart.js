import React from 'react';
import {Button, TextField, Grid} from '@mui/material';
import AuthService from '../../services/auth';

export default function sessionStart(props) {
  const creatorID = AuthService.currentUser();
  const [notes, setNotes] = React.useState('""');
  const [timeout, setTimeout] = React.useState();
  const [gameID, setGameID] = React.useState();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h2>Start Game Session</h2>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="outlined-required"
          label="Game ID"
          defaultValue={gameID}
          onChange={(e) => setGameID(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="outlined-required"
          label="Timeout (minutes)"
          defaultValue={timeout}
          onChange={(e) => setTimeout(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          required
          id="outlined-multiline-flexible"
          label="Additional Notes"
          defaultValue={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={10}
        />
      </Grid>
      <Grid item xs={6}>
        <Button onClick={props.onCancel}>Cancel</Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          onClick={() => {
            props.onSubmit(
                creatorID,
                gameID,
                notes,
                timeout,
            );
          }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
