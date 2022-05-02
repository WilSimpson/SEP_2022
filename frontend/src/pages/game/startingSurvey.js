import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {useLocation} from 'react-router-dom';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {useNavigate} from 'react-router-dom';
import {List, ListItemText, ListItem, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
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
          <Container component="main" maxWidth="md" sx={{mb: 4}}>
            <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
              {(GamePlayService.gameInProgress() &&
              (GamePlayService.getInProgressGame().state.code == state.code)) ?
              <GameInProgressAlert /> :
              <div />
              }
              <Typography component="h1" variant="h4" align="center">
                {' '}
                {`Welcome to ${state ? state.game.title : 'Game is NULL'}`}{' '}
              </Typography>
              <Box sx={{pb: 2}}>
                {err && <Alert severity="error">{err}</Alert>}
              </Box>
              <form onSubmit={handleSubmit}>
                <List>
                  <ListItem key='team-size' sx={{py: 1, px: 0}}>
                    <ListItemText primary='Team Size' secondary={formValues.size} />
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
                  </ListItem>
                  <ListItem key='first-time' sx={{py: 1, px: 0}}>
                    <ListItemText
                      primary='Is this your first time playing this game?'
                      secondary={formValues.first.toUpperCase()} />
                    <ToggleButtonGroup
                      name="first"
                      value={formValues.first}
                      onChange={handleInputChange}
                      color="secondary"
                    >
                      <ToggleButton name='first' value='yes'>Yes</ToggleButton>
                      <ToggleButton name='first' value='no'>No</ToggleButton>
                    </ToggleButtonGroup>
                  </ListItem>
                  <ListItem key='game-type' sx={{py: 1, px: 0}}>
                    <ListItemText
                      primary='Which version of the game would you like to play?'
                      secondary={formValues.type.toUpperCase()} />
                    <ToggleButtonGroup
                      color='secondary'
                      value={formValues.type}
                      name='type'
                      exclusive
                      onChange={handleInputChange}
                    >
                      <ToggleButton name='type' value='Walking'>Walking</ToggleButton>
                      <ToggleButton name='type' value='Limited Walking'>Limited Walking</ToggleButton>
                      <ToggleButton name='type' value='No Walking'>No Walking</ToggleButton>
                    </ToggleButtonGroup>
                  </ListItem>
                  <ListItem key='team-name' sx={{py: 1, px: 0}}>
                    <ListItemText
                      primary='Team Name'
                      secondary={formValues.name} />
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
                  </ListItem>
                </List>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  data-testid="submit"
                  disabled={submitDisabled}
                >
                  Submit
                </Button>
              </form>
            </Paper>
          </Container>
        </main>
      </div>
    </GameLayout>
  );
}
