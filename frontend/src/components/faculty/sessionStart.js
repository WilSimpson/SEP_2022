import React, {useEffect} from 'react';
import {
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  Autocomplete,
} from '@mui/material';
import AuthService from '../../services/auth';
import courseService from '../../services/courses';

export default function SessionStart(props) {
  const creatorId = AuthService.currentUser().id;
  const [notes, setNotes] = React.useState(null);
  const [timeout, setTimeout] = React.useState(null);
  const [gameId, setGameId] = React.useState(null);
  const [isGuest, setIsGuest] = React.useState(false);
  const [courseID, setCourseID] = React.useState(null);
  const [courses, setCourses] = React.useState(sessionStorage.getItem('courses') ? JSON.parse(sessionStorage.getItem('courses')).map(((course) => ({label: course.name, id: course.id}))) : []);

  useEffect(() => {
    if (!sessionStorage.getItem('courses')) {
      courseService.getMyCourses(AuthService.currentUser().id).then(
          (response) => {
            sessionStorage.setItem('courses', JSON.stringify(response.data));
            setCourses(response.data.map((course) => ({label: course.name, id: course.id})));
          }).catch((error) => {
        console.log(`There was an error ${error}`);
        setCourses([]);
      });
    }
  }, []);

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
          defaultValue={gameId}
          onChange={(e) => setGameId(e.target.value)}
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
            props.onSubmit(creatorId, gameId, notes, timeout, courseID, !isGuest);
          }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
