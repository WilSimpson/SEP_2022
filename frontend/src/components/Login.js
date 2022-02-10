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
import { LoadingButton } from '@mui/lab'
import AuthService from '../services/auth.service';
import validator from 'validator';

const theme = createTheme();


export default function Login() {
    const userRef = useRef();
    const errRef = useRef();

    // State elements
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        AuthService.login(email, pwd).then(
            () => {
                
            },
            error => {
                const message =
                    (error.response &&
                        error.response.data && 
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                setLoading(false);
                setErrMsg(message);        
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
                        Sign in
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        { errMsg && <Alert severity="error" ref={errRef}>{errMsg}</Alert> }
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
                        />
                        {loading ? 
                            (<LoadingButton loading>
                                Submit
                            </LoadingButton>) 
                            : (<Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}
                                disabled={disableSubmit}
                            >
                                Sign In
                            </Button>)
                        }
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}