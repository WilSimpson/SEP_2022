import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GameCode from '../../components/game/gameCode';
import logoLarge from '../../images/logoLarge.png'
import DefaultLayout from '../../components/layout/default.layout';

export default function Home(props) {
  return (
    <DefaultLayout>
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
              <Typography variant="h5" align="center" paragraph>
                To join a game, enter your 6-digit game code:
              </Typography>
              <GameCode />
            </Container>
          </Box>
      </Container>
    </DefaultLayout>
  );
}