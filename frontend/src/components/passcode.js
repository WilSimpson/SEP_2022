import React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
import AuthService from '../services/auth.service';
import gameServices from '../services/services';

const theme = createTheme();


export default function Passcode(props) {
    const errRef = useRef();

    // State elements
    const [pcd, setPcd] = useState('');
    const [errMsg, setErrMsg] = useState('');
  


    const handleSubmit = (event) => {
        event.preventDefault();
        setErrMsg('');
        gameServices.checkPasscode(pcd).then(
            (response) => {
                if (response.status === 200) {
                    window.location.href = props.data.question;
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
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Avatar sx={{ m:1, bgcolor:'blue' }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Go to The Location Below and Enter the Passcode
                    </Typography>
                    <Typography component='h1' variant='h5'>
                        {props.data.location}
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        { errMsg && <Alert severity="error" ref={errRef} data-testid='err-msg'>{errMsg}</Alert> }
                        <TextField 
                            margin='normal'
                            required
                            fullWidth
                            name='passcode'
                            label='Passcode'
                            type='passcode'
                            id='passcode'
                            value={pcd}
                            autoComplete='passcode'
                            onChange={(e) => setPcd(e.target.value)}  
                            inputProps={{ 'data-testid': 'pass-input' }}  
                        />
                        <Button
                            type='submit'
                            id='submit-button'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            disabled={false}
                            data-testid='submit-button'
                        >
                            Continue
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}