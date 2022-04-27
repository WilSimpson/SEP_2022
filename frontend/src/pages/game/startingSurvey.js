import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {useLocation} from 'react-router-dom';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {Typography} from '@mui/material';
import GamePlayService from '../../services/gameplay';
import Alert from '@mui/material/Alert';
import GameInProgressAlert from '../../components/game/gameInProgressAlert';
import GameLayout from '../../components/layout/game.layout';

export default function StartingSurvey() {
  const defaultValues = {
    name: '',
    size: '',
    first: '',
    type: '',
  };

  // a null gamecode will not allow page to load
  const {state} = useLocation();

  const [formValues, setFormValues] = useState(defaultValues);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [err, setErr] = useState('');

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  React.useEffect(() => {
    let disableSubmit = false;
    Object.entries(formValues).map(([key, value]) => {
      if (value === defaultValues[key]) {
        disableSubmit = true;
      }
      setSubmitDisabled(disableSubmit);
      return true;
    });
  }, [formValues]);

  const initialQuestion = (game) => {
    const destinationQuestions = game.options.map(
        (option) => option.dest_question,
    );
    const startingQuestions = game.questions.filter(
        (question) => !destinationQuestions.includes(question.id),
    );
    const startQ =
    startingQuestions[Math.floor(Math.random() * startingQuestions.length)];
    return startQ;
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    GamePlayService.sendTeamInit(
        state.game.id,
        formValues.type,
        false,
        formValues.size,
        formValues.first,
    ).then(
        (response) => {
          const path = `../gameSession`;
          const initialQ = initialQuestion(state.game);
          const gameSessionState = {
            state: {
              // Carries the gameCode with the state
              code: state.code,
              // Initialize state with the response
              // parsed as an array of questions
              game: state.game,
              // Carry the form data forward
              formData: formValues,
              team_id: response['id'],
              currentQuestion: initialQ,
              enteredPasscode: false,
            },
          };
          GamePlayService.setInProgressGame(gameSessionState);
          navigate(path, gameSessionState);
        }).catch((error) => {
      if (error.response && error.response.status === 404) {
        setErr(
            'There was an unexpected error reaching the server. ' +
            'Please try again later.',
        );
      } else {
        if (error.response && error.response.status === 500) {
          setErr(error.response.data);
        } else {
          setErr(
              'The server is unreachable at this time. ' +
              'Please try again later.',
          );
        }
      }
    },
    );
  };

  return (
    <GameLayout>
      <div className="container">
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Container maxWidth="xl">
            <Box
              sx={{
                pt: 0,
                pb: 6,
                borderRadius: 4,
                mt: 3,
                mb: 3,
              }}
            >
              {(GamePlayService.gameInProgress() &&
              (GamePlayService.getInProgressGame().state.code == state.code)) ?
              <GameInProgressAlert /> :
              <div />
              }
              <Typography>
                {' '}
                {`Game Title: ${state ? state.game.title : 'Game is NULL'}`}{' '}
              </Typography>
              <Box sx={{pb: 2}}>
                {err && <Alert severity="error">{err}</Alert>}
              </Box>
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Grid item>
                    <Box sx={{pb: 2}}>
                      <TextField
                        id="team-size"
                        name="size"
                        label="size"
                        type="number"
                        InputProps={{inputProps: {min: 1}}}
                        value={formValues.size}
                        onChange={handleInputChange}
                        data-testid="size"
                        required
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box sx={{pb: 2}}>
                      <FormControl>
                        <FormLabel>
                          Is this your first time playing this game?
                        </FormLabel>
                        <RadioGroup
                          name="first"
                          defaultValue="yes"
                          value={formValues.first}
                          onChange={handleInputChange}
                          row
                        >
                          <FormControlLabel
                            key="yes"
                            value="yes"
                            control={<Radio size="small" />}
                            label="Yes"
                            selected
                          />
                          <FormControlLabel
                            key="no"
                            value="no"
                            control={<Radio size="small" />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box sx={{pb: 2}}>
                      <FormControl>
                        <FormLabel>
                          Which version of the game would you like to play?
                        </FormLabel>
                        <RadioGroup
                          name="type"
                          defaultValue="Walking"
                          value={formValues.type}
                          onChange={handleInputChange}
                          row
                        >
                          <FormControlLabel
                            key="Walking"
                            value="Walking"
                            control={<Radio size="small" />}
                            label="Walking"
                            selected
                          />
                          <FormControlLabel
                            key="Limited Walking"
                            value="Limited Walking"
                            control={<Radio size="small" />}
                            label="Limited Walking"
                          />
                          <FormControlLabel
                            key="No Walking"
                            value="No Walking"
                            control={<Radio size="small" />}
                            label="No Walking"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box sx={{pb: 2}}>
                      <TextField
                        id="team-name"
                        name="name"
                        label="Team Name"
                        type="text"
                        autoComplete="off"
                        value={formValues.name}
                        onChange={handleInputChange}
                        data-testid="name"
                        inputProps={{'data-testid': 'name'}}
                        required
                      />
                    </Box>
                  </Grid>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    data-testid="submit"
                    disabled={submitDisabled}
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            </Box>
          </Container>
        </main>
      </div>
    </GameLayout>
  );
}
