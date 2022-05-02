import {
  Switch,
  Typography,
  Container,
  Paper,
  ListItem,
  List,
  ListItemText,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import React, {useState} from 'react';
import DefaultLayout from '../../components/layout/default.layout';

export default function Settings(props) {
  const [checked, setChecked] = useState(localStorage.getItem('dark') === 'true');

  const changeTheme = () => {
    setChecked(!checked);
    props.handleTheme();
  };

  return (
    <DefaultLayout>
      <Container component="main" maxWidth="sm" sx={{mb: 4}}>
        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
          <Typography component="h1" variant="h4" align="center">
            System Settings
          </Typography>

          <List>
            <ListItem key='theme' sx={{py: 1, px: 0}}>
              <ListItemText primary='Site Theme' secondary={checked ? 'Dark' : 'Light'} />
              <LightModeIcon />
              <Switch
                defaultChecked={checked}
                onChange={() => changeTheme()}
                inputProps={{'aria-label': 'controlled'}}
                id='darkSwitch'
              />
              <NightlightRoundIcon />
            </ListItem>
          </List>
        </Paper>
      </Container>
    </DefaultLayout>
  );
}

