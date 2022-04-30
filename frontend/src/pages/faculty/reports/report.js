import {Autocomplete, Button, Container, Grid, Paper, TextField} from '@mui/material';
import React from 'react';
import {useNavigate, useParams} from 'react-router';
import GameSessionsTable from '../../../components/faculty/gameSessionsTable.tsx';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';
import gameSessionService from '../../../services/gameSession';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import {alertService, alertSeverity} from '../../../services/alert';

export default function ReportPage(props) {
  const navigate = useNavigate();

  const {id} = useParams();
  const [sessions, setSessions] = React.useState([]);

  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const [, setGameCode] = React.useState();

  const [, setCreatedBy] = React.useState();

  const [selectedIds, setSelectedIds] = React.useState([]);

  const handleSessionSelectionChange = (ids) => {
    setSelectedIds([...ids]);
  };

  React.useEffect(() => {
    async function getSessions() {
      const resp = await gameSessionService.getSessions(id).catch((error) => {
        alertService.alert({severity: alertSeverity.error, message: error});
      });
      setSessions(resp.data);
    }
    getSessions();
  }, []);

  return (
    <AuthenticatedLayout>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              elevation={7}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'auto',
              }}
            >
              <h2>Generating Report for Game {id}</h2>
              <Grid container spacing={2} sx={{pl: 2, pr: 2, pb: 2}}>
                <Grid item xs={12}>
                  <h4>Filters</h4>
                </Grid>


                <Grid item xs={12} md={6} lg={3}>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <MobileDatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      renderInput={(params) => <TextField testid='start-date-textfield' {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>


                <Grid item xs={12} md={6} lg={3}>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <MobileDatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>


                <Grid item xs={12} md={6} lg={3}>
                  <Autocomplete
                    disablePortal
                    freeSolo
                    id="created-by-search"
                    options={sessions.filter(
                        (value, index, self) =>
                          self.findIndex((v) => v.creator_id === value.creator_id) === index)
                    }
                    getOptionLabel={(s) => s.creator_id.toString()}
                    renderInput={(params) => <TextField {...params} label="Created By" />}
                    onChange={(event, selected) => setCreatedBy(selected)}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                  <Autocomplete
                    disablePortal
                    freeSolo
                    id="gamecode-search"
                    options={sessions}
                    getOptionLabel={(s) => s.code.toString()}
                    renderInput={(params) => <TextField {...params} label="Gamecode" />}
                    onChange={(event, selected) => setGameCode(selected)}
                  />
                </Grid>
              </Grid>
              <GameSessionsTable
                selectable
                gameSessions={sessions}
                onSessionSelectionChange={handleSessionSelectionChange}
              />
              <Button
                sx={{
                  'width': '100%',
                  'height': 'auto',
                }}
                variant='contained'
                onClick={() => navigate(`/reports/${id}/view${selectedIds.length == 0 ? '' : `?ids=${selectedIds.join(',')}`}`)}
              >
                Generate Report
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
