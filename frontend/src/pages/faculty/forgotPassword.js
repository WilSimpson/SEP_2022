import React from 'react';
import {useRef, useState} from 'react';
import {Alert, Box, Button, TextField, Typography} from '@mui/material';
import PasswordService from '../../services/password';
import DefaultLayout from '../../components/layout/default.layout';
import {alertService} from '../../services/alert';

export default function ForgotPassword() {
  const errRef = useRef();

  // State elements
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [disable, setDisable] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrMsg('');
    PasswordService.checkEmail(email).then(
        (response) => {
          if (response.status === 200) {
            alertService.success('Check your email for a link');
            setDisable(true);
          } else {
            setErrMsg(
                'There was an error sending the email.',
            );
          }
        }).catch((error) => {
      if (error.response.status === 401) {
        setErrMsg(error.response.data.detail);
      } else {
        setErrMsg('There was an unexpected error. Please try again later.');
      }
    },
    );
  };
  return (
    <DefaultLayout>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Enter your email to send a reset link
        </Typography>
        <Box component="form" id='submit-box' onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          {errMsg && (
            <Alert severity="error" ref={errRef} data-testid="err-msg">
              {errMsg}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{'data-testid': 'email-input'}}
          />
          <Button
            type="submit"
            id="submit-button"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            disabled={disable}
            data-testid="submit-button"
          >
            Continue
          </Button>
        </Box>
      </Box>
    </DefaultLayout>
  );
}
