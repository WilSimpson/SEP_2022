import * as React from 'react';
import Container from '@material-ui/core/Container';
import DefaultLayout from '../../components/layout/default.layout';
import {Grid, Paper} from '@mui/material';

export default function Knowledge() {
  return (
    <DefaultLayout>
      <Container maxWidth="lg">
        <Paper
          elevation={7}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            mt: 5,
          }}
        >
          <Grid container spacing={3} sx={{justifyContent: 'center'}}>
            <Grid item xs={12}>
              <h1>How to play a Game with Ethics Adventure:</h1>
            </Grid>
            <Grid item xs={12} md={4} xl={4}>
              <img
                src='/images/qrCodeScanStock.png'
                alt="Scan a QR code"
                style={{flex: 1, width: '100%', height: undefined}}
              />
            </Grid>
            <Grid item xs={12} md={4} xl={4} sx={{alignSelf: 'center'}}>
              <h2>Scan a QR code given by your game host<br />
              OR <br/>
              Enter a 6 digit join code on the <a href='/'>home screen</a>.</h2>
            </Grid>
            <Grid item xs={12} md={4} xl={4}>
              <img
                src='/images/joinCodeScreen.png'
                alt="Scan a QR code"
                style={{flex: 1, width: '100%', height: undefined}}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={6} sx={{alignSelf: 'center'}}>
              <h2>Next, fill out all of the fields in the survey.
                <br/> A <em>WALKING</em> or <em>LIMITED WALKING</em> game will prompt
                you to input a password to continue to the next question.
              </h2>
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <img
                src='/images/startingSurveyScreen.png'
                alt="Scan a QR code"
                style={{flex: 1, width: '100%', height: undefined}}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <img
                src='/images/question1Screen.png'
                alt="Scan a QR code"
                style={{flex: 1, width: '100%', height: undefined}}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={6} sx={{alignSelf: 'center'}}>
              <h2>Once you have finished your survey, the Game will begin.
                <br/>Select an option based on the scenario you have been presented with,
                and click <em>CONTINUE</em>.
              </h2>
            </Grid>
            <Grid item xs={12} md={6} xl={6} sx={{alignSelf: 'center'}}>
              <h2>Throughout the Game, you may run into games of chance.<br/>
              Spin the Wheel and a path with be selected for you.
              </h2>
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <img
                src='/images/gameOfChanceScreen.png'
                alt="Scan a QR code"
                style={{flex: 1, width: '100%', height: undefined}}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <img
                src='/images/endGameScreen.png'
                alt="Scan a QR code"
                style={{flex: 1, width: '100%', height: undefined}}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={6} sx={{alignSelf: 'center'}}>
              <h2>Continue this process until the Game is completed.</h2>
            </Grid>
            {/* <Grid item xs={12} md={4} xl={4}>
              <h2>Hello 12</h2>
            </Grid>
            <Grid item xs={12} md={4} xl={4}>
              <h2>Hello 13</h2>
            </Grid> */}
          </Grid>
        </Paper>
      </Container>
    </DefaultLayout>
  );
}
