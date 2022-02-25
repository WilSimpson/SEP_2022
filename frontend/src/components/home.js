import * as React from 'react';
import ResponsiveAppBar from './nav';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GameCode from './gameCode';
import StickyFooter from './stickyFooter';
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
          <Container maxWidth="sm">
              <img src={logoLarge} alt="Ethics Adventure" style={{flex: 1, width: '100%', height: undefined}}/>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              To join a game, enter your 6-digit game code:
            </Typography>
            <GameCode />
          </Container>
        </Box>
    </Container>
      </main>
      <StickyFooter />
      </div>
  );
}