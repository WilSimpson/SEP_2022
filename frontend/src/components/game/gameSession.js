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
import HelpIcon from '@mui/icons-material/Help';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Wheel from './theWheel';

function SimpleDialog(props) {
  const {onClose, open, hints} = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{overflow: 'hidden'}}>
      <DialogTitle>Help</DialogTitle>
      <List sx={{pt: 0}}>
        {hints.map((hint) => (
          <Box key={hint}>
            <ListItem key={hint.title}>
              <ListItemText primary={hint.title} />
            </ListItem>
            <ListItem key={hint.body}>
              <ListItemText primary={hint.body} />
            </ListItem>
          </Box>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('close')}>
          <ListItemText primary="Close" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  hints: PropTypes.array.isRequired,
};

export default function GameSession() {
  const {state} = useLocation();
  const navigate = useNavigate();
  const TIMEOUT_ERR_MSG = 'Your Game has timed out. Please start a new Game.';
  const [timeoutOpen, setTimeoutOpen] = useState(false);
  const [showPasscode, setShowPasscode] = useState(
      (GamePlayService.getGameMode() == WALKING ||
      GamePlayService.getGameMode() == LIMITED_WALKING) &&
      !(GamePlayService.hasEnteredPasscode()),
  );
  const [currentQuestion, setQuestion] = useState(
      GamePlayService.getInProgressGame().state.currentQuestion,
  );
  const [currentOptions, setOptions] = useState(
      state.game.options.filter(
          (option) => option.source_question == currentQuestion.id,
      ));
  const [selectedOption, setSelectedOption] = useState(null);
  const [endGame, setEndGame] = useState(false);
  const [open, setOpen] = useState(false);
  const [hints, setHints] = useState(currentQuestion.help);
  let weights = findWeights(currentOptions);
  let randomChoice = random();
  let data = {weight: weights, selected: randomChoice, callBack: chanceCallback};
  const [key, setKey] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  React.useEffect(() => {
    setOptions(
        state.game.options.filter(
            (option) => option.source_question == currentQuestion.id,
        ));
  }, [currentQuestion]);

  React.useEffect(() => {
    setEndGame(currentOptions.length == 0);
    weights = findWeights(currentOptions);
    randomChoice = random();
    data = {weight: weights, selected: randomChoice, callBack: chanceCallback};
    setKey(key+1);
  }, [currentOptions]);

  const setNextQuestion = () => {
    const question = (state.game.questions).find(
        (question) => question.id == selectedOption.dest_question,
    );
    GamePlayService.updateCurrentQuestion(question);
    setQuestion(question);
    setSelectedOption(null);
    setHints(currentQuestion.help);
  };

  const setError = (error) => {
    let errMessage = '';
    if (error.response.status === 400 && error.response.data == TIMEOUT_ERR_MSG) {
      setTimeoutOpen(true);
      GamePlayService.clearInProgressGame();
    } else {
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
    }
  };

  const nextQuestion = () => {
    const mode = GamePlayService.getGameMode();
    if ( mode == LIMITED_WALKING || mode == WALKING) {
      GamePlayService.updateOption(selectedOption.id).then(
          (response) => {
            setShowPasscode(true);
            GamePlayService.setEnteredPasscode(false);
            setNextQuestion();
          },
          (error) => {
            setError(error);
          },
      );
    } else {
      GamePlayService.createAnswer(selectedOption.id, currentQuestion.id, state.team_id, null).then(
          (response) => setNextQuestion(),
          (error) => setError(error),
      );
    }
  };

  const completeGame = () => {
    GamePlayService.teamCompleteGame(state.team_id).then(
        (response) => {
          navigate(`../endGame`);
          GamePlayService.clearInProgressGame();
        },
        (error) => setError(error),
    );
  };
  function findWeights(cO) {
    const opts = {};
    let index = 0;
    let i;
    for (i in cO) {
      if (cO.hasOwnProperty(i)) {
        opts[index] = cO[i].weight;
        index = index + 1;
      }
    }
    return opts;
  }
  function random() {
    const rChoice = GamePlayService.random(weights);
    return parseInt(rChoice);
  }

  function chanceCallback(win) {
    setSelectedOption(currentOptions[win]);
  }

  function returnHome() {
    GamePlayService.clearInProgressGame();
    navigate('/');
  }

  function newGame() {
    GamePlayService.clearInProgressGame();
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

  const submitPasscode = (pcd) => {
    GamePlayService.createAnswer(null, currentQuestion.id, state.team_id, pcd).then(
        (response) => {
          setShowPasscode(false);
          GamePlayService.setEnteredPasscode(true);
        },
        (error) => setError(error),
    );
  };

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
          {currentQuestion ? <>{currentQuestion.value} <HelpIcon onClick={handleClickOpen} data-testid='helpButton' /></> : 'Game not found'}
        </Typography>
        <SimpleDialog
          open={open}
          onClose={handleClose}
          hints={hints}
        />
        { currentQuestion.chance_game == 'SPIN_WHEEL' ?
             <Wheel data={data} key={key}/> : null
        }
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
              disabled={currentQuestion.chance ? true : false}>
              {option.value}
            </Button>
          ))}
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
                  disabled={selectedOption ? false : true}
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
              <Passcode id='passcode-screen' data={{question: '/#', location: 'SC123'}} submitPasscode={submitPasscode}/> :
              GamePlay
            }
          </Container>
        </main>
      </div>
    </GameLayout>
  );
}
