import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate, useLocation} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CourseService from '../../services/courses';
import AuthService from '../../services/auth';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';
import {Paper} from '@mui/material';
import EndCourseDialog from '../../components/faculty/endCourseDialog';

export default function EditCourse() {
  let {state} = useLocation();
  state = state ? state : {
    id: 1,
    name: 'NO COURSE FOUND',
    department: 'NO DEPARTMENT',
    courseNumber: '0000',
    sectionNumber: '0000',
    semester: 'NO SEMESTER',
    active: true,
  };

  const defaultValues = {
    name: state.name,
    department: state.department,
    courseNumber: state.courseNumber,
    sectionNumber: state.sectionNumber,
    semester: state.semester,
    active: state.active,
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [err, setErr] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    if (open) {
      handleDelete();
    }
  }, [confirm]);

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
        true,
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

  const handleDelete = () => {
    if (confirm) {
      CourseService.editCourse(
          state.id,
          formValues.name,
          formValues.department,
          formValues.courseNumber,
          formValues.sectionNumber,
          formValues.semester,
          false,
          AuthService.currentUser().id,
      ).then(() => {
        const path = '../dashboard';
        navigate(path);
      },
      ).catch((error) => {
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
      });
    } else {
      setOpen(true);
    }
  };

  return (
    <AuthenticatedLayout>
      <EndCourseDialog
        open={open}
        close={() => setOpen(false)}
        keepCourse={() => setOpen(false)}
        endCourse={() => setConfirm(true)}
      />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} component={Paper} sx={{p: '1.5rem'}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h2>Edit {state.name}</h2>
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
                  id="delete"
                  variant="outlined"
                  data-testid="delete"
                  sx={{width: '100%'}}
                  onClick={handleDelete}
                >
                  End Course
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  id="edit-course"
                  variant="contained"
                  color="secondary"
                  type="submit"
                  data-testid="submit"
                  sx={{width: '100%'}}
                  onClick={handleSubmit}
                >
                  Save Changes
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  data-testid="back"
                  sx={{width: '50%'}}
                  href="../dashboard"
                >
                  Go Back
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
