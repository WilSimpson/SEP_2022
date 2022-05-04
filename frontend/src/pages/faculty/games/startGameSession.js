import React from 'react';
import {Container, Grid, Paper} from '@mui/material';
import gameSessionService from '../../../services/gameSession';
import {useNavigate} from 'react-router-dom';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';
import {alertService, alertSeverity} from '../../../services/alert';
import SessionStart from '../../../components/faculty/sessionStart';
import AuthService from '../../../services/auth';

export default function StartGameSession(props) {
  const navigate = useNavigate();

  function handleCancel() {
    alertService.alert({
      severity: alertSeverity.info,
      message: 'Game Session not Started',
    });
    AuthService.currentUser().isAdmin() ?
      navigate('/dashboard') :
      navigate('/dashboard');
  }

  function handleSubmit(creatorId, gameId, notes, timeout, courseID, isGuest) {
    gameSessionService
        .createGameSession(creatorId, gameId, notes, timeout, courseID, isGuest)
        .then( (success) => {
          alertService.alert({
            severity: alertSeverity.success,
            message: `Game Session Started,
                    Join Code: ${String(success.data.code).padStart(6, '0')}`,
          });
          AuthService.currentUser().isAdmin() ?
          navigate('/dashboard') :
          navigate('/dashboard');
        }).catch(() => {
          alertService.error('error creating session');
        });
  }

  return (
    <AuthenticatedLayout>
      <Container maxWidth='lg'>
        <Grid container spacing={3} sx={{justifyContent: 'center'}}>
          <Grid item xs={12} component={Paper} sx={{p: '1.5rem'}}>
            <SessionStart
              onCancel={handleCancel}
              onSubmit={handleSubmit}
            />
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
