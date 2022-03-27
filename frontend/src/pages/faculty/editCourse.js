import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate, useLocation} from 'react-router-dom';
import {Typography} from '@mui/material';
import Alert from '@mui/material/Alert';
import CourseService from '../../services/courses';
import AuthService from '../../services/auth';

export default function EditCourse() {
  const {state} = useLocation();
  console.log(state.sectionNumber);

  const defaultValues = {
    name: state.name,
    department: state.department,
    courseNumber: state.courseNumber,
    sectionNumber: state.sectionNumber,
    semester: state.semester,
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [err, setErr] = useState('');

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    Object.entries(formValues).map(([key, value]) => {
      if (value === defaultValues[key]) {
      }
      return true;
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    CourseService.editCourse(
        state.id,
        formValues.name,
        formValues.department,
        formValues.courseNumber,
        formValues.sectionNumber,
        formValues.semester,
        AuthService.currentUser().id,
    ).then(
        (response) => {
          console.log(response);
          const path = `../faculty-dashboard`;
          navigate(path);
        },
        (error) => {
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
            <Typography>
              `Edit ${state.name}`
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
                      id="name"
                      name="name"
                      label="Course Name"
                      type="text"
                      autoComplete="off"
                      value={formValues.name}
                      onChange={handleInputChange}
                      data-testid="name"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{pb: 2}}>
                    <TextField
                      id="department"
                      name="department"
                      label="Department"
                      type="text"
                      autoComplete="off"
                      value={formValues.department}
                      onChange={handleInputChange}
                      data-testid="department"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{pb: 2}}>
                    <TextField
                      id="courseNumber"
                      name="courseNumber"
                      label="Course Number"
                      type="number"
                      InputProps={{inputProps: {min: 0}}}
                      value={formValues.courseNumber}
                      onChange={handleInputChange}
                      data-testid="courseNumber"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{pb: 2}}>
                    <TextField
                      id="sectionNumber"
                      name="sectionNumber"
                      label="Section Number"
                      type="number"
                      InputProps={{inputProps: {min: 0}}}
                      value={formValues.sectionNumber}
                      onChange={handleInputChange}
                      data-testid="sectionNumber"
                      required
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{pb: 2}}>
                    <TextField
                      id="semester"
                      name="semester"
                      label="Semester"
                      type="text"
                      autoComplete="off"
                      value={formValues.semester}
                      onChange={handleInputChange}
                      data-testid="semester"
                      inputProps={{'data-testid': 'semester'}}
                      required
                    />
                  </Box>
                </Grid>
                <Box sx={{pb: 2}}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    data-testid="submit"
                  >
                  Save Changes
                  </Button>
                </Box>
                <Button
                  variant="outlined"
                  color="secondary"
                  data-testid="back"
                  href="../faculty-dashboard"
                >
                  Go Back
                </Button>
              </Grid>
            </form>
          </Box>
        </Container>
      </main>
    </div>
  );
}
