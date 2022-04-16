import {Button, Grid, Paper, TextField} from '@mui/material';
import React from 'react';
import QRCode from 'react-qr-code';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';
import {saveSvgAsPng} from 'save-svg-as-png';
import {alertService} from '../../services/alert';
import {useQuery} from '../../helpers/query';

export default function GenerateQRPage(props) {
  const query = useQuery();
  const joinCode = query.get('joinCode');
  const urlPrefix = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ?
        'http://localhost:3000/?joinCode=' : 'https://sep22.forever.dev/?joinCode=';

  const [url, setURL] = React.useState(joinCode ? urlPrefix+joinCode : '');

  return (
    <AuthenticatedLayout>
      <Grid container spacing={3} sx={{pl: '3rem', width: '100%'}}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h1>Generate QR Code</h1>
            <p>Enter the URL for the QR code to link to</p>
            <TextField
              required
              id="outlined-required"
              label="QR URL"
              defaultValue={url}
              onChange={(e) => setURL(e.target.value)}
            />
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
