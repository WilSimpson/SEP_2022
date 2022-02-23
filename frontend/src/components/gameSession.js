import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';

export default function GameSession() {

    //a null gamecode will not allow page to load
    //Will have state.code, state.game, and state.formValues
    const { state } = useLocation();

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
              <Typography>Game Code: { state ? state.code : "No Game Code" } </Typography>
          </Container>
        </Box>
    </Container>
      </main>
      </div>
  );
}