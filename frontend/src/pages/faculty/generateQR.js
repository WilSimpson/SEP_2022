import {Button, Grid, Paper, TextField} from '@mui/material';
import React from 'react';
import QRCode from 'react-qr-code';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';
import {saveSvgAsPng} from 'save-svg-as-png';
import {alertService} from '../../services/alert';

export default function GenerateQRPage() {
  const [url, setURL] = React.useState('');

  return (
    <AuthenticatedLayout>
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
            <Button
              onClick={() => {
                if (url == '') {
                  alertService.error('No URL set');
                } else {
                  saveSvgAsPng(
                      document.getElementById('qr-code').firstChild,
                      'qrcode.png',
                  );
                }
              }}
            >
              Download QR Code
            </Button>
            <div id="qr-code">
              {url == '' ? null : <QRCode value={url} />}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </AuthenticatedLayout>
  );
}
