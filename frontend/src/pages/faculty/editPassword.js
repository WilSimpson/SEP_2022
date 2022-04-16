import React from 'react';
import {useRef, useState} from 'react';
import {Alert, Box, Button, TextField, Typography} from '@mui/material';
import PasswordService from '../../services/password';
import DefaultLayout from '../../components/layout/default.layout';
import {alertService} from '../../services/alert';

export default function EditPassword() {
  const errRef = useRef();

  // State elements
  const [newPass, setNewPass] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [disable, setDisable] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrMsg('');
    PasswordService.changePassword(hashToken, newPass).then(
        (response) => {
          if (response.status === 200) {
            alertService.success('Password Changed');
            setDisable(true);
          } else {
            setErrMsg(
                'There was an error changing the password.',
            );
          }
        },
        (error) => {
          if (error.response.status === 400) {
            let message = '';
            error.response.data.password.forEach(function cat(e) {
              message += ' ' + e;
            });
            setErrMsg(message);
          } else {
            setErrMsg('There was an unexpected error. Please try again later.');
          }
        },
    );
  };
  const hashToken = (window.location.hash.substr(1)); // substr(1) to remove the `#`
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
          Enter your new password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          {errMsg && (
            <Alert severity="error" ref={errRef} data-testid="err-msg">
              {errMsg}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={newPass}
            autoComplete="new password"
            onChange={(e) => setNewPass(e.target.value)}
            inputProps={{'data-testid': 'password-input'}}
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
