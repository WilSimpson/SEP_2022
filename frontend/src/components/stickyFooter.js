import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © Ethics Adventure'}{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default class StickyFooter extends React.Component {
    render () {
        return (
      <footer style={{position: 'fixed', width:'100%', bottom:0, marginTop:100}}>
      <Box sx={{ bgcolor: 'background.paper', p: 1 }} component="footer">
        <Copyright />
      </Box>
      </footer>
        );
    }
}