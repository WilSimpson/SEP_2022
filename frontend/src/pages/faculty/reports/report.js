import {Autocomplete, Button, Checkbox, Container, FormControlLabel, FormGroup, FormLabel, Grid, Paper, Radio, RadioGroup, Switch, TextField, Typography} from '@mui/material';
import React from 'react';
import {useParams} from 'react-router';
import GameSessionsTable from '../../../components/faculty/gameSessionsTable.tsx';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';
import gameSessionService from '../../../services/gameSession';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import {alertService, alertSeverity} from '../../../services/alert';

export default function ReportPage(props) {
  const {id} = useParams();
  const [sessions, setSessions] = React.useState([]);

  const startDateRefDefault = 'after';
  const [, setStartDateRef] = React.useState();
  const [startDate, setStartDate] = React.useState();

  const endDateRefDefault = 'before';
  const [, setEndDateRef] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const [, setGameCode] = React.useState();

  const [, setCreatedBy] = React.useState();

  const reportFormatDefault = 'csv';
  const [, setReportFormat] = React.useState(reportFormatDefault);

  const [shouldIncludeSurvey, setShouldIncludeSurvey] = React.useState(true);
  const [shouldCalculateTime, setShouldCalculateTime] = React.useState(true);
  const [shouldIncludeTimestamps, setShouldIncludeTimestamps] = React.useState(false);

  const [includeWalking, setIncludeWalking] = React.useState(true);
  const [includeLimitedWalking, setIncludeLimitedWalking] = React.useState(true);
  const [includeNonWalking, setIncludeNonWalking] = React.useState(true);

  const handleSessionSelectionChange = (ids) => {
    console.log('ids:', ids);
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
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <RadioGroup
                    row
                    defaultValue={startDateRefDefault}
                    name='start-time-reference'
                    onChange={(event) => setStartDateRef(event.target.value)}
                    sx={{
                      'justifyContent': 'center',
                    }}
                  >
                    <FormControlLabel value='before' control={<Radio />} label='Before' />
                    <FormControlLabel value='after' control={<Radio />} label='After' />
                  </RadioGroup>
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
                  <RadioGroup
                    row
                    defaultValue={endDateRefDefault}
                    name='end-time-reference'
                    onChange={(event) => setEndDateRef(event.target.value)}
                    sx={{
                      'justifyContent': 'center',
                    }}
                  >
                    <FormControlLabel value='before' control={<Radio />} label='Before' />
                    <FormControlLabel value='after' control={<Radio />} label='After' />
                  </RadioGroup>
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
              <Grid container spacing={2} sx={{pl: 2, pr: 2, pb: 2}}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{pt: 2}}>
                    Report Details
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                  <FormGroup
                    sx={{
                      'alignContent': 'center',
                    }}
                  >
                    <FormLabel>
                      Report Format
                    </FormLabel>
                    <RadioGroup
                      row
                      defaultValue={reportFormatDefault}
                      name='end-time-reference'
                      onChange={(event) => setReportFormat(event.target.value)}
                    >
                      <FormControlLabel value='csv' control={<Radio />} label='CSV' />
                      <FormControlLabel value='json' control={<Radio />} label='JSON' />
                    </RadioGroup>
                  </FormGroup>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                  <FormGroup
                    sx={{
                      'alignContent': 'center',
                    }}
                  >
                    <FormLabel>
                      Include Survey
                    </FormLabel>
                    <Switch
                      checked={shouldIncludeSurvey}
                      onChange={(event) => setShouldIncludeSurvey(event.target.checked)}
                      sx={{
                        'alignSelf': 'center',
                      }}
                    />
                  </FormGroup>
                </Grid>


                <Grid item xs={12} md={6} lg={3}>
                  <FormGroup>
                    <FormLabel>
                      Calculate Time Between Answers
                    </FormLabel>
                    <Switch
                      checked={shouldCalculateTime}
                      onChange={(event) => setShouldCalculateTime(event.target.checked)}
                      sx={{
                        'alignSelf': 'center',
                      }}
                    />
                  </FormGroup>
                </Grid>


                <Grid item xs={12} md={6} lg={3}>
                  <FormGroup>
                    <FormLabel>
                      Include Timestamps
                    </FormLabel>
                    <Switch
                      checked={shouldIncludeTimestamps}
                      onChange={(event) => setShouldIncludeTimestamps(event.target.checked)}
                      sx={{
                        'alignSelf': 'center',
                      }}
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                  <FormLabel>
                    Include Walking Modes
                  </FormLabel>
                  <FormGroup
                    row
                    sx={{
                      'alignContent': 'center',
                    }}
                  >
                    <FormControlLabel
                      label="Walking"
                      control={<Checkbox checked={includeWalking} onChange={(event) => setIncludeWalking(event.target.checked)} />}
                    />
                    <FormControlLabel
                      label="Limited Walking"
                      control={<Checkbox checked={includeLimitedWalking} onChange={(event) => setIncludeLimitedWalking(event.target.checked)} />}
                    />
                    <FormControlLabel
                      label="Non Walking"
                      control={<Checkbox checked={includeNonWalking} onChange={(event) => setIncludeNonWalking(event.target.checked)} />}
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Button
                sx={{
                  'width': '100%',
                  'height': 'auto',
                }}
                variant='contained'
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
