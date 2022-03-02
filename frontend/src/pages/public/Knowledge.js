import * as React from 'react';
import ResponsiveAppBar from '../../components/layout/nav';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import StickyFooter from '../../components/layout/stickyFooter';

export default function Knowledge() {
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
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              How to play a game: 
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              1.) Scan a QR code given to you by the game host
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              2.) Enter the asked for info
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              3.) Answer the question
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              4.) Read the Resault
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              5.) Proceed to given location and enter code if nessesssary
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              6.) Repeat until game is over
            </Typography>
          </Container>
        </Box>
    </Container>
      </main>
      <StickyFooter />
      </div>
  );
}