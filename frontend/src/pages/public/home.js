import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GameCode from '../../components/game/gameCode';
import DefaultLayout from '../../components/layout/default.layout';
import GameInProgressAlert from '../../components/game/gameInProgressAlert';
import GamePlayService from '../../services/gameplay';
import {useQuery} from '../../helpers/query';

export default function Home(props) {
  const query = useQuery();
  const joinCode = query.get('joinCode');

  return (
    <DefaultLayout>
      <Container maxWidth="xl">
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
            {GamePlayService.gameInProgress() ?
              <GameInProgressAlert /> : <div />}
            <img
              src='/images/logoLarge.png'
              alt="Ethics Adventure"
              style={{flex: 1, width: '100%', height: undefined}}
            />
            <Typography variant="h5" align="center" paragraph>
              To join a game, enter your 6-digit game code:
            </Typography>
            <GameCode joinCode={joinCode} test='test' />
          </Container>
        </Box>
      </Container>
    </DefaultLayout>
  );
}
