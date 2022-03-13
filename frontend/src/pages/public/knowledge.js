import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import DefaultLayout from '../../components/layout/default.layout';

export default function Knowledge() {
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
            <Typography
              variant="h5"
              align="center"
              color="secondary"
              paragraph
            >
              How to play a game:
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="secondary"
              paragraph
            >
              1.) Scan a QR code given to you by the game host
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="secondary"
              paragraph
            >
              2.) Enter the asked for info
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="secondary"
              paragraph
            >
              3.) Answer the question
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="secondary"
              paragraph
            >
              4.) Read the Result
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="secondary"
              paragraph
            >
              5.) Proceed to given location and enter code if necessary
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="secondary"
              paragraph
            >
              6.) Repeat until game is over
            </Typography>
          </Container>
        </Box>
      </Container>
    </DefaultLayout>
  );
}
