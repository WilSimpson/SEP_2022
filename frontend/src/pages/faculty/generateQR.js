import {Container, Grid, Paper, TextField} from '@mui/material';
import React from 'react';
import QRCode from 'react-qr-code';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';

export default function GenerateQRPage() {
  const [url, setURL] = React.useState('');

  return (
    <AuthenticatedLayout>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              elevation={7}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <h1>Generate QR Code</h1>
              <p>Enter the URL for the QR code to link to</p>
              <Grid item xs={12}>
                <TextField
                  required
                  id="outlined-required"
                  label="QR URL"
                  defaultValue=''
                  onChange={(e) => setURL(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                {url == '' ? null : <QRCode value={url} />}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
