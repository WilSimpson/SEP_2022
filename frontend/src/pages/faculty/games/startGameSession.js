import React from 'react';
import {Container, Grid} from '@mui/material';
import gameSessionService from '../../../services/gameSession';
import {useNavigate} from 'react-router-dom';
import AuthenticatedLayout
  from '../../../components/layout/authenticated.layout';
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
    AuthService.currentUser().isAdmin() ? (
        navigate('/admin-dashboard')) : (
        navigate('/faculty-dashboard'));
  }

  function handleSubmit(
      creatorId,
      gameId,
      notes,
      timeout,

  ) {
    gameSessionService
        .createGameSession(creatorId, gameId, notes, timeout)
        .then(
            (success) => {
              alertService.alert({
                severity: alertSeverity.success,
                message: 'Game Session Started',
              });
              AuthService.currentUser().isAdmin() ? (
                navigate('/admin-dashboard')) : (
                navigate('/faculty-dashboard'));
            },
            (error) => {
              alertService.alert({
                severity: alertSeverity.error,
                message: error.message,
              });
            },
        );
  }

  return (
    <AuthenticatedLayout>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SessionStart onCancel={handleCancel} onSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
// @TODO Make this page a page in components/faculty, then use that as a rendering with paper in THIS file
// @TODO use gameFields and create.js as benchmarks
