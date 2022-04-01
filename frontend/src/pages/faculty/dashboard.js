import * as React from 'react';
import {
  Button,
  Tooltip,
  Container,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Link,
  Table,
  IconButton,
  TextField,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import {TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import {useState} from 'react';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';
import GamesTable from '../../components/admin/gamesTable';
import gameService from '../../services/game';
import gameSessionService from '../../services/gameSession';
import courseService from '../../services/courses';
import {useEffect} from 'react';
import {LinearProgress} from '@mui/material';
import {Box} from '@mui/system';
import AuthService from '../../services/auth';
import {Cancel} from '@material-ui/icons';

// interface GamesSessions {
//   name: string;
//   starttime: date;
//   endtime: date;
//   gamecode: number;
// }

function GameSessionTable() {
  const rows = gameSessionService.getGameSessions();
  // const rows = props.data || [];
  const [filteredRows, setFilteredRows] = useState(rows);
  const [confirmationEndID, setConfirmationEndID] = React.useState(null);

  const handleCloseConfirmation = () => {
    setConfirmationEndID(null);
  };

  const requestSearch = (searchedVal) => {
    console.log(searchedVal);
    setFilteredRows(rows.filter((row) => {
      return row.gamecode.includes(searchedVal);
    }));
  };

  return (
    <React.Fragment>
      <Dialog open={confirmationEndID != null}>
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to stop this game session?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ending a game session is permanent and this game session can no longer be used or viewed.
            A hidden copy will be kept kept in the database for logging and
            compilation of reports that used this game session.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onConfirmEnd(confirmationEndID)}>
            End Permanently
          </Button>
          <Button onClick={handleCloseConfirmation} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Typography component="h2" variant="h6" gutterBottom>
        Active Game Sessions
      </Typography>
      <TextField
        label='Search by Session Code'
        onChange={(event) => requestSearch(event.target.value)}
      />
      <Table size="small" data-testid="active-game-sessions">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Game Code</TableCell>
            <TableCell>View Reports</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Tooltip title="Download QR Code">
                  <IconButton size="large">
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.starttime}</TableCell>
              <TableCell>{row.endtime}</TableCell>
              <TableCell>{row.gamecode}</TableCell>
              <TableCell>
                <Button variant="outlined">Reports</Button>
              </TableCell>
              <TableCell>
                <Tooltip title="End Game Session">
                  <IconButton
                    aria-label="end"
                    onClick={() => {
                      setConfirmationEndID(session.id);
                    }}
                  >
                    <Cancel />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}


function CoursesTable() {
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    courseService.getMyCourses(AuthService.currentUser().id).then(
        (response) => {
          console.log(response.data);
          setRows(response.data);
          setFilteredRows(response.data);
          setLoading(false);
        }).catch( (error) => {
      console.log(`There was an error ${error}`);
      setRows([{department: 'There was a problem',
        name: 'N/A', courseNumber: 'N/A', sectionNumber: 'N/A',
        semester: 'N/A'}]);
      setFilteredRows([{department: 'There was a problem',
        name: 'N/A', courseNumber: 'N/A', sectionNumber: 'N/A',
        semester: 'N/A'}]);
      setLoading(false);
    });
  }, []);

  const searchCourses = (searchedVal) => {
    setFilteredRows(rows.filter((row) => {
      return Object.values(row).some((e) => e.toLowerCase()
          .includes(searchedVal.toLowerCase()));
    }));
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" gutterBottom>
        Courses
      </Typography>
      <Box sx={{pb: 2}}>
        {loading && <LinearProgress />}
      </Box>
      <TextField
        label='Search by Course Name'
        onChange={(event) => searchCourses(event.target.value)}
      />
      <Table data-testid="course_table" sx={{minWidth: 500}}>
        <TableHead>
          <TableRow>
            <TableCell>Department</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Course Number</TableCell>
            <TableCell>Section Number</TableCell>
            <TableCell>Semester</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.courseNumber}</TableCell>
              <TableCell>{row.sectionNumber}</TableCell>
              <TableCell>{row.semester}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default function FacultyDash() {
  return (
    <AuthenticatedLayout>
      <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <Paper
              elevation={7}
              data-testid="totalCourses"
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                overflowX: 'auto',
              }}
            >
              <React.Fragment>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Total Courses
                </Typography>
                <Typography component="p" variant="h4">
                  1
                </Typography>
                <div>
                  <Button color="secondary" variant="contained"
                    href="faculty-dashboard/addCourse"
                    data-testid="courses-button">
                    Add a Course
                  </Button>
                </div>
              </React.Fragment>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <Paper
              elevation={7}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                overflowX: 'auto',
              }}
            >
              <CoursesTable />
            </Paper>
          </Grid>
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
              <GamesTable games={gameService.getGames() || []} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              elevation={7}
              data-testid="total-games"
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <React.Fragment>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Total Games
                </Typography>
                <Typography component="p" variant="h4">
                  2
                </Typography>
                <div>
                  <Link color="primary" href="#">
                    View Games
                  </Link>
                </div>
              </React.Fragment>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={7}
              sx={{p: 2, display: 'flex', flexDirection: 'column',
                overflowX: 'auto'}}
            >
              <GameSessionTable />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
