import React from 'react';
import {Button, TextField, Container, Grid} from '@mui/material';
import gameSessionService from '../../../services/gameSession';
import {useNavigate} from 'react-router-dom';
import AuthenticatedLayout
  from '../../../components/layout/authenticated.layout';
import {alertService, alertSeverity} from '../../../services/alert';

export default function StartGameSession() {
  const navigate = useNavigate();

  const creatorID = authService.currentUser().id;
  const [notes, setNotes] = React.useState('""');
  const [timeout, setTimeout] = React.useState(false);
  const [gameID, setGameID] = React.useState(false);

  function handleCancel() {
    alertService.alert({
      severity: alertSeverity.info,
      message: 'Game Session not Started',
    });
    navigate('/faculty-dashboard');
  }

  function handleSubmit(
      creatorID,
      gameID,
      notes,
      timeout,

  ) {
    console.log('code', code);
    gameSessionService
        .createGameSession(creatorID, gameID, notes, timeout)
        .then(
            (success) => {
              alertService.alert({
                severity: alertSeverity.success,
                message: 'Game Session Started',
              });
              navigate('/faculty-dashboard');
            },
            (error) => {
              alertService.alert({
                severity: alertSeverity.error,
                message: error.message,
              });
            },
        );
  }

  return (
    <AuthenticatedLayout>
      <Container maxWidth="lg">
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
      </Container>
    </AuthenticatedLayout>
  );
}
//@TODO Make this page a page in components/faculty, then use that as a rendering with paper in THIS file
//@TODO use gameFields and create.js as benchmarks