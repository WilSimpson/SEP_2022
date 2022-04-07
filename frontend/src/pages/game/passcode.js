import React from 'react';
import {useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
// import gamePlayService from '../../services/gameplay';

export default function Passcode(props) {
  // const errRef = useRef();

  // // State elements
  const [pcd, setPcd] = useState('');
  // const [errMsg, setErrMsg] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.submitPasscode(pcd);
  };


  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Go to The Location Below and Enter the Passcode
      </Typography>
      <Typography component="h1" variant="h5">
        {props.data.location}
      </Typography>
      <Box sx={{mt: 1}}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="passcode"
          label="Passcode"
          type="passcode"
          id="passcode"
          value={pcd}
          autoComplete="passcode"
          onChange={(e) => setPcd(e.target.value)}
          inputProps={{'data-testid': 'pass-input'}}
        />
        <Button
          id="submit-button"
          fullWidth
          variant="contained"
          sx={{mt: 3, mb: 2}}
          disabled={false}
          data-testid="submit-button"
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
