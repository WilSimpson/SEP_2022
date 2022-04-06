import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useLocation} from 'react-router-dom';
import {useState} from 'react';
import {Button} from '@mui/material';
import {ButtonGroup} from '@mui/material';
import GamePlayService from '../../services/gameplay';
import {alertService, alertSeverity} from '../../services/alert';
import {useNavigate} from 'react-router-dom';
import HelpIcon from '@mui/icons-material/Help';
export default function GameSession() {
  const {state} = useLocation();
  const navigate = useNavigate();
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

  const nextQuestion = () => {
    GamePlayService.answerQuestion(selectedOption.id, state.team_id).then(
        (response) => {},
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
    const question = (state.game.questions).find(
        (question) => question.id == selectedOption.dest_question,
    );
    GamePlayService.updateCurrentQuestion(question);
    setQuestion(question);
    setSelectedOption(null);
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
  // const currentHelpModal = {
  //   Put stuff for the help menu here
  // };
  return (
    <div className='container'>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Container maxWidth='xl'>
          <Box
            sx={{
              pt: 0,
              pb: 6,
              borderRadius: 4,
              mt: 3,
              mb: 3,
            }}
            justify="center"
            alignItems="center"
          >
            <Container maxWidth="sm">
              <Typography>
                {currentQuestion ? <div>{currentQuestion.value} <HelpIcon /></div> : 'Game not found'}
              </Typography>
              <ButtonGroup
                variant="contained"
                alignItems="center"
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
                        inputProps={{'data-testid': 'complete'}}
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
                        inputProps={{'data-testid': 'continue'}}
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
        </Container>
      </main>
    </div>
  );
}
