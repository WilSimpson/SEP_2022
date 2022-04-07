import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useLocation} from 'react-router-dom';
import {useState} from 'react';
import {Button} from '@mui/material';
import {ButtonGroup} from '@mui/material';
import GamePlayService, {LIMITED_WALKING, WALKING} from '../../services/gameplay';
import {alertService, alertSeverity} from '../../services/alert';
import {useNavigate} from 'react-router-dom';
import GamePlayTimeout from './gamePlayTimeout';
import GameLayout from '../layout/game.layout';
import Passcode from '../../pages/game/passcode';
export default function GameSession() {
  const {state} = useLocation();
  const navigate = useNavigate();
  const TIMEOUT_ERR_MSG = 'Your Game has timed out. Please start a new Game.';
  const [timeoutOpen, setTimeoutOpen] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [currentQuestion, setQuestion] = useState(
      GamePlayService.getInProgressGame().state.currentQuestion,
  );
  const [currentOptions, setOptions] = useState(
      state.game.options.filter(
          (option) => option.source_question == currentQuestion.id,
      ));
  const [selectedOption, setSelectedOption] = useState();
  const [endGame, setEndGame] = useState(false);

  React.useEffect(() => {
    setOptions(
        state.game.options.filter(
            (option) => option.source_question == currentQuestion.id,
        ));
  }, [currentQuestion]);

  React.useEffect(() => {
    setEndGame(currentOptions.length == 0);
  }, [currentOptions]);

  const setNextQuestion = () => {
    const question = (state.game.questions).find(
        (question) => question.id == selectedOption.dest_question,
    );
    GamePlayService.updateCurrentQuestion(question);
    setQuestion(question);
    setSelectedOption(null);
  };

  const setError = (error) => {
    let errMessage = '';
    if (error.response.status === 400 && error.response.data == TIMEOUT_ERR_MSG) {
      setTimeoutOpen(true);
      handleTimeoutOpen();
      GamePlayService.clearInProgressGame();
    } else {
      if (error.response && error.response.data && error.response.status != 404) {
        errMessage = error.response.data;
      } else {
        errMessage = 'The server is currently unreachable. ' +
        'Please try again later.';
      }
      alertService.alert({
        severity: alertSeverity.error,
        message: errMessage,
      });
    }
  };

  const nextQuestion = () => {
    if (state.formData.type == LIMITED_WALKING || state.formData.type == WALKING) {
      GamePlayService.updateAnswer(selectedOption.id).then(
          (response) => {
            setShowPasscode(true);
            setNextQuestion();
          },
          (error) => {
            setError(error);
          },
      );
    } else {
      GamePlayService.createAnswer(selectedOption.id, currentQuestion.id, state.team_id, null).then(
          (response) => {
            setNextQuestion();
          },
          (error) => {
            setError(error);
          },
      );
    }
  };

  const completeGame = () => {
    GamePlayService.teamCompleteGame(state.team_id).then(
        (response) => {
          navigate(`../endGame`);
          GamePlayService.clearInProgressGame();
        },
        (error) => {
          let errMessage = '';
          if (error.response && error.response.data) {
            errMessage = error.response.data;
          } else {
            errMessage = 'The server is currently unreachable. ' +
            'Please try again later.';
          }
          alertService.alert({
            severity: alertSeverity.error,
            message: errMessage,
          });
        },
    );
  };
  const weights = {};
  let index = 0;
  let i;
  for (i in currentOptions) {
    if (currentOptions.hasOwnProperty(i)) {
      weights[index] = currentOptions[i].weight;
      index = index + 1;
    }
  }
  function choiceClick() {
    const choice = GamePlayService.random(weights);
    return choice;
  }

  function returnHome() {
    navigate('/');
  }

  function newGame() {
    GamePlayService.joinGame(state.code).then(
        (response) => {
          const path = `/startingSurvey`;
          navigate(path, {
            state: {
              code: state.code,
              game: response,
            },
          });
        },
        (error) => {
          let errMessage = '';
          if (error.response && error.response.status === 404) {
            errMessage = 'There was an unexpected error reaching the server. ' +
            'Please try again later.';
          } else {
            if (error.response && error.response.status === 500) {
              errMessage = error.response.data;
            } else {
              errMessage = 'The server is currently unreachable. ' +
              'Please try again later.';
            }
          }
          alertService.alert({
            severity: alertSeverity.error,
            message: errMessage,
          });
        },
    );
  }

  const GamePlay = (
    <Box
      sx={{
        pt: 0,
        pb: 6,
        borderRadius: 4,
        mt: 3,
        mb: 3,
      }}
      justify="center"
      align="center"
    >
      <Container maxWidth="sm">
        <GamePlayTimeout id='timeout-dialog' open={timeoutOpen} returnHome={returnHome} newGame={newGame}/>
        <Typography>
          {currentQuestion ? currentQuestion.value : 'Game not found'}
        </Typography>
        <ButtonGroup
          variant="contained"
          align="center"
          justify="center"
          orientation="vertical"
          fullWidth={true}
        >
          {currentOptions.map((option) => (
            <Button
              key={option.id}
              variant=
                {selectedOption == option ? 'contained' : 'outlined'}
              sx={{marginTop: 5}}
              data-testid={'option'+ String(option.id)}
              onClick={() => setSelectedOption(option)}
              disabled={currentQuestion.chance}>
              {option.value}
            </Button>
          ))}
          { currentQuestion.chance ?
            <Button
              color='secondary'
              sx={{marginTop: 5}}
              data-testid='chance'
              onClick={() =>
                setSelectedOption(currentOptions[choiceClick()])
              }
              disabled={selectedOption}
            >
            Chance
            </Button> : null
          }
          {
            endGame ?
              (
                <Button
                  color='secondary'
                  sx={{marginTop: 5}}
                  onClick={completeGame}
                  data-testid='complete'
                >
                  Complete Game
                </Button>
              ) :
              (
                <Button
                  color='secondary'
                  sx={{marginTop: 5}}
                  onClick={nextQuestion}
                  data-testid='continue'
                  disabled={!selectedOption}
                >
                  Continue
                </Button>
              )
          }

        </ButtonGroup>
      </Container>
    </Box>
  );

  return (
    <GameLayout>
      <div className='container'>
        <CssBaseline />
        <main>
          <Container maxWidth='xl'>
            {showPasscode ?
              <Passcode data={{question: '/#', location: 'SC123'}} /> :
              GamePlay
            }
          </Container>
        </main>
      </div>
    </GameLayout>
  );
}
