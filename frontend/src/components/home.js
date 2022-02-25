import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GameCode from './gameCode';
import logoLarge from '../images/logoLarge.png'

export default function Home() {
  return (
      <div className='container'>
      <CssBaseline />
      <main>
        {/* Hero unit */}
    <Container maxWidth='xl'>
        <Box
          sx={{
            pt: 0,
            pb: 6,
            borderRadius: 4,
            mt: 3,
            mb: 3,
          }}
        >
          <Container maxWidth="sm" justify="center" alignItems="center">
              <img src={logoLarge} alt="Ethics Adventure" style={{flex: 1, width: '100%', height: undefined}}/>
            <Typography variant="h5" align="center" paragraph>
              To join a game, enter your 6-digit game code:
            </Typography>
            <GameCode />
          </Container>
        </Box>
    </Container>
      </main>
      </div>
  );
}