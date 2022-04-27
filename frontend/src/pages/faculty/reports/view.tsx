import {Container, Grid, Paper, Typography} from '@mui/material';
import React from 'react';
import {useParams} from 'react-router';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';
import gameSessionService from '../../../services/gameSession';
import {alertService, alertSeverity} from '../../../services/alert';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {useQuery} from '../../../helpers/query';

/**
 * Properties for the view report page (ViewReportPage)
 */
interface ViewReportPageProps {}

/**
 * Generates a report page for the given session ids, or every session
 * within the game if `ids` search param is not present. The props
 * define how the request is to be made to the backend and more
 * filters can be done after the data is requested.
 *
 * @param {ViewReportPageProps} props properties of the report page
 * @return {React.ReactFragment} view of the report for the game
 */
export default function ViewReportPage(props: ViewReportPageProps) {
  // The game ID for the sessions
  const {id} = useParams();
  const query: URLSearchParams = useQuery();

  // Loading is true until all reports requests are returned
  const [loading, setLoading] = React.useState(true);

  // Game session ids to be used in the report generation. If null, then
  // all sessions should be used.
  const ids: number[] | null = query.get('ids') ? query.get('ids').split(',').map((i) => parseInt(i)) : null;
  // const [reports, setReports] = React.useState([]);
  const [reportRows, setReportRows] = React.useState([]);
  const [reportCols, setReportCols] = React.useState([]);

  React.useEffect(() => {
    /**
     * Get a CSV report for a specific session
     *
     * @param {number} sessionId session to get report for
     * @param {boolean} lastReport whether this is the last report. If true, then set loading to false
     * after a response from the server is received.
     */
    async function addSessionReport(sessionId: number, lastReport: boolean = true): Promise<void> {
      await gameSessionService.getReport(id, sessionId, false).then((resp) => {
        if (resp && resp.data.length > 0) {
          if (reportCols.length == 0) {
            const cols = [];
            for (const k of Object.keys(resp.data[0])) {
              cols.push({
                field: k,
                headerName: k,
              });
            }
            setReportCols(cols);
          }

          setReportRows([...reportRows, ...resp.data]);
        }
      }).catch((error) => {
        alertService.alert({severity: alertSeverity.error, message: error.message});
      }).finally(() => setLoading(lastReport));
    }

    /**
     * Get reports for the given session ids
     *
     * @param {number[]} sessionIds session ids to get reports for
     */
    function addSessionReports(sessionIds: number[]): void {
      for (let i=0; i<sessionIds.length; i++) {
        addSessionReport(sessionIds[i], (sessionIds.length==i-1 ? true : false));
      }
    }

    // Get all of the session reports
    if (ids) {
      addSessionReports(ids);
    } else {
      gameSessionService.getSessions(parseInt(id)).then((resp) => {
        addSessionReports(resp.data.map((s: GameSession) => s.id));
      }).catch((error) => {
        alertService.alert({severity: alertSeverity.error, message: error});
      });
    }
  }, []);

  return (
    <AuthenticatedLayout>
      <Container maxWidth='lg' sx={{mt: 4, mb: 4}}>
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
              <Grid container spacing={2} sx={{pl: 2, pr: 2, pb: 2}}>
                <Grid item xs={12}>
                  <Typography variant='h5' sx={{pt: 2}}>
                    Viewing Report
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <DataGrid getRowId={(row) => row['TEAM ID']} columns={reportCols} rows={reportRows} loading={loading} components={{Toolbar: GridToolbar}} sx={{height: '80vh'}}/>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
