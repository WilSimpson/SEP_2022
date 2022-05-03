import * as React from 'react';
import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
// import {Typography} from '@mui/material';
import Alert from '@mui/material/Alert';
import CourseService from '../../services/courses';
import AuthService from '../../services/auth';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';
import {Paper, Container} from '@mui/material';

export default function AddCourse() {
  const defaultValues = {
    name: '',
    department: '',
    courseNumber: 0,
    sectionNumber: 0,
    semester: '',
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [err, setErr] = useState('');

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    let disableSubmit = false;
    Object.entries(formValues).map(([key, value]) => {
      if (value === defaultValues[key]) {
        disableSubmit = true;
      }
      setSubmitDisabled(disableSubmit);
      return true;
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    CourseService.createCourse(
        formValues.name,
        formValues.department,
        formValues.courseNumber,
        formValues.sectionNumber,
        formValues.semester,
        AuthService.currentUser().id,
    ).then(
        (response) => {
          const path = `../dashboard`;
          navigate(path);
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
    <AuthenticatedLayout>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} component={Paper} sx={{p: '1.5rem'}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h2>Add a New Course</h2>
              </Grid>
              <Box sx={{pb: 2}}>
                {err && <Alert severity="error">{err}</Alert>}
              </Box>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  label="Course Name"
                  type="text"
                  autoComplete="off"
                  value={formValues.name}
                  onChange={handleInputChange}
                  data-testid="name"
                  sx={{width: '75%'}}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="department"
                  name="department"
                  label="Department"
                  type="text"
                  autoComplete="off"
                  value={formValues.department}
                  onChange={handleInputChange}
                  data-testid="department"
                  sx={{width: '75%'}}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="courseNumber"
                  name="courseNumber"
                  label="Course Number"
                  type="number"
                  InputProps={{inputProps: {min: 0}}}
                  value={formValues.courseNumber}
                  onChange={handleInputChange}
                  data-testid="courseNumber"
                  sx={{width: '75%'}}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="sectionNumber"
                  name="sectionNumber"
                  label="Section Number"
                  type="number"
                  InputProps={{inputProps: {min: 0}}}
                  value={formValues.sectionNumber}
                  onChange={handleInputChange}
                  data-testid="sectionNumber"
                  sx={{width: '75%'}}
                  required
                />
              </Grid>
              <Grid item xs={12}>
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
                  sx={{width: '75%'}}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  data-testid="back"
                  href="../dashboard"
                  sx={{width: '100%'}}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  id='create-course'
                  variant="contained"
                  color="secondary"
                  type="submit"
                  data-testid="submit"
                  onClick={handleSubmit}
                  disabled={submitDisabled}
                  sx={{width: '100%'}}
                >
                  Create Course
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
