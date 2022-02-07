import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button, 
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography
} from '@mui/material'
import axios from 'axios';

const theme = createTheme();

export default function Login() {
    const handleSubmit = (event) => {
        console.log(event);
        event.preventDefault();
        axios.post('http://localhost:3000/api/v1/login', 
        {
            'email': event.target.email.value,
            'password': event.target.password.value
        }).then(
            result => {
                console.log(result);
            }
        );
    };
    
    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                {/* Look up CssBaseline */}
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        {/* Look up what Avatar is */}
                    <Avatar sx={{ m:1, bgcolor:'blue' }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField 
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                        />
                        <TextField 
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'    
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}