import * as React from 'react';
import {useContext, useEffect, useRef, useState} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material';
import AuthService from '../../services/auth';
import validator from 'validator';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const theme = createTheme();

export default function Register() {
  const userRef = useRef();
  const errRef = useRef();

  // State elements
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [role, setRole] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    setErrMsg('');
    if (validator.isEmail(email) && password.length >= 6) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [email, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrMsg('');
    AuthService.register(email, password, first, last, role).then(
        (response) => {
          if (response.status === 200) {
            window.location.href = '/users';
          } else {
            setErrMsg(
                'There was an issue handling your account registration. Please try again later.',
            );
          }
        },
        (error) => {
          if (error.response.status === 401) {
            setErrMsg(error.response.data.detail);
          } else {
            setErrMsg('There was an unexpected error. Please try again later.');
          }
        },
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register Account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{mt: 3}}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField // first name field
                  autoComplete="given-name"
                  name="first"
                  required
                  fullWidth
                  id="first"
                  label="First Name"
                  ref={userRef}
                  onChange={(e) => setFirst(e.target.value)}
                  inputProps={{'data-testid': 'first-input'}}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField // last name field
                  required
                  fullWidth
                  id="last"
                  label="Last Name"
                  name="last"
                  ref={userRef}
                  onChange={(e) => setLast(e.target.value)}
                  inputProps={{'data-testid': 'last-input'}}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField // email field
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  ref={userRef}
                  onChange={(e) => setEmail(e.target.value)}
                  inputProps={{'data-testid': 'email-input'}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField // pass field
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  inputProps={{'data-testid': 'pass-input'}}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="role">User Role</InputLabel>
                <Select // select role drop-down
                  required
                  fullWidth
                  labelId="role"
                  label="User's Role"
                  id="role"
                  value={role}
                  inputProps={{'data-testid': 'role-select'}}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value={'Administrator'}>Administrator</MenuItem>
                  <MenuItem value={'Faculty'}>Faculty</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Button // submit button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              disabled={disableSubmit}
              data-testid="submit-button"
            >
              Register Account
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
