import React from 'react';
import { useEffect, useRef, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/AccountCircle';
import { StyledEngineProvider } from '@mui/material/styles';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography
} from '@mui/material'
import AuthService from '../../services/auth.service';
import validator from 'validator';
import { User } from '../../models/user.model';
import DefaultLayout from '../../components/layout/default.layout';
import authService from '../../services/auth.service';


export default function Login() {
  const userRef = useRef();
  const errRef = useRef();

  // State elements
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
    if (validator.isEmail(email) && pwd.length >= 6) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [email, pwd])

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrMsg('');
    AuthService.login(email, pwd).then(
      (response) => {
        if (response.status === 200) {
          if (authService.currentUser().isAdmin()) {
            window.location.href = "/admin-dashboard";
          } else {
            window.location.href = "/faculty-dashboard";
          }
        } else {
          setErrMsg('There was an issue handling your login. Please try again later.');
        }
      },
      (error) => {
        if (error.response.status === 401) {
          setErrMsg(error.response.data.detail);
        } else {
          setErrMsg('There was an unexpected error. Please try again later.');
        }
      }
    );
  }

  return (
    <DefaultLayout>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {errMsg && <Alert severity="error" ref={errRef} data-testid='err-msg'>{errMsg}</Alert>}
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            value={email}
            autoComplete='email'
            autoFocus
            ref={userRef}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{ 'data-testid': 'email-input' }}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={pwd}
            autoComplete='current-password'
            onChange={(e) => setPwd(e.target.value)}
            inputProps={{ 'data-testid': 'pass-input' }}
          />
          <Button
            type='submit'
            id='submit-button'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={disableSubmit}
            data-testid='submit-button'
            color='secondary'
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </DefaultLayout>
  );
}