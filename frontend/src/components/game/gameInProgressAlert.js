import React from 'react';
import '../../setupTests';
import {Alert, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import GamePlayService from '../../services/gameplay';

export default function GameInProgressAlert(props) {
  const navigate = useNavigate();

  const joinInProgressGame = () => {
    const ipState = GamePlayService.getInProgressGame();
    const path = `../gameSession`;
    navigate(path, {
      state: {
        code: ipState.state.code,
        game: ipState.state.game,
        formData: ipState.state.formValues,
        team_id: ipState.state.team_id,
        currentQuestion: ipState.state.currentQuestion,
        enteredPasscode: ipState.state.enteredPasscode,
      },
    });
  };

  return (
    <Alert
      severity="info"
      variant="outlined"
      action={
        <Button
          id='joinGame'
          color="success"
          variant="contained"
          size="large"
          onClick={joinInProgressGame}
          data-testid={'joinGame'}
        >
          JOIN
        </Button>
      }
    >
      You have a game currently in progress. Would you like to join this game?
    </Alert>
  );
}
