import React, {useEffect} from 'react';
import {
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import AuthService from '../../services/auth';
import {alertService} from '../../services/alert';
import courseService from '../../services/courses';
import GameService from '../../services/game';

export default function SessionStart(props) {
  const creatorId = AuthService.currentUser().id;
  const [notes, setNotes] = React.useState('');
  const [timeout, setTimeout] = React.useState('');
  const [gameId, setGameId] = React.useState('');
  const [isGuest, setIsGuest] = React.useState('');
  const [courseID, setCourseID] = React.useState('');
  const [courses, setCourses] = React.useState([]);
  const [gamesMeta, setGamesMeta] = React.useState([]);
  // const [selectedGame, setSelectedGame] = React.useState(null);
  // const [age, setAge] = React.useState('');

  const handleGameSelected = (event) => {
    setGameId(event.target.value);
  };

  useEffect(() => {
    if (!sessionStorage.getItem('courses')) {
      try {
        courseService.getMyCourses(AuthService.currentUser().id).then(
            (response) => {
              sessionStorage.setItem('courses', JSON.stringify(response.data));
              setCourses(response.data.map((course) => ({label: course.name, id: course.id})));
            }).catch((error) => alertService.error(error));
      } catch (err) {
        console.log('error:', err);
      }
    } else {
      setCourses(JSON.parse(sessionStorage.getItem('courses')).map(((course) => ({label: course.name, id: course.id}))));
    }
  }, []);

  useEffect(() => {
    GameService.getGames().then(
        (response) => {
          setGamesMeta([...response.data]);
        });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h2>Start Game Session</h2>
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{m: 1, minWidth: 120}}>
          <InputLabel id="game-input-label">Game</InputLabel>
          <Select
            required
            labelId="helper-label"
            id="game-select"
            value={gameId}
            label="Game"
            onChange={handleGameSelected}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {gamesMeta.map((gameItem) =>
              (<MenuItem
                key={gameItem.id}
                value={gameItem.id}>
                {gameItem.title}
              </MenuItem>),
            )}
          </Select>
        </FormControl>
      </Grid>
      {/* <Grid item xs={12}>
        <TextField
          required
          id="outlined-required"
          label="Game ID"
          value={gameId}
          onChange={(e) => {
            if (e) {
              setGameId(e.target.value);
            }
          }}
        />
      </Grid> */}
      <Grid item xs={12}>
        <TextField
          required
          id="outlined-required"
          label="Timeout (minutes)"
          value={timeout}
          onChange={(e) => setTimeout(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel control={<Switch />} label="For a Class" color="primary" onChange={() => setIsGuest(!isGuest)} />
      </Grid>
      <Grid item xs={12}>
        {isGuest && <Autocomplete id='courses' options={courses} onChange={(e, v) => setCourseID(v.id)}
          renderInput={(params) => <TextField {...params} label="Select Course" />}
        />}
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          required
          id="outlined-multiline-flexible"
          label="Additional Notes"
          value={notes}
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
            props.onSubmit(creatorId, gameId, notes, timeout, courseID, !isGuest);
          }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
