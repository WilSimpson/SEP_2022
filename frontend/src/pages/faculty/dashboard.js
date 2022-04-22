import * as React from 'react';
import {
  Button,
  Tooltip,
  Container,
  Grid,
  Paper,
  Typography,
  Link,
  Table,
  IconButton,
  TextField,
} from '@mui/material';
import {TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import {useState} from 'react';
import AuthenticatedLayout from '../../components/layout/authenticated.layout';
import GamesTable from '../../components/admin/gamesTable';
import gameService from '../../services/game';
import courseService from '../../services/courses';
import {useEffect} from 'react';
import {LinearProgress} from '@mui/material';
import {Box} from '@mui/system';
import AuthService from '../../services/auth';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from 'react-router-dom';
import GameSessionsTable from '../../components/faculty/gameSessionsTable.tsx';
import gameSessionService from '../../services/gameSession';
import {alertService, alertSeverity} from '../../services/alert';

function CoursesTable() {
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    courseService.getMyCourses(AuthService.currentUser().id).then(
        (response) => {
          setRows(response.data);
          setFilteredRows(response.data);
          sessionStorage.setItem('courses', JSON.stringify(response.data));
          setLoading(false);
        }).catch((error) => {
      setRows([{
        department: 'There was a problem',
        name: 'N/A', courseNumber: '000', sectionNumber: '000',
        semester: 'N/A',
      }]);
      setFilteredRows([{
        department: 'There was a problem',
        name: 'N/A', courseNumber: '000', sectionNumber: '000',
        semester: 'N/A',
      }]);
      setLoading(false);
    });
  }, []);

  const searchCourses = (searchedVal) => {
    setFilteredRows(rows.filter((row) => {
      return Object.values(row).some((e) => String(e).toLowerCase()
          .includes(searchedVal.toLowerCase()));
    }));
  };

  const editThisCourse = (id, name, department, courseNumber,
      sectionNumber, semester, active) => {
    const path = `editCourse`;
    navigate(path, {
      state: {
        id: id,
        name: name,
        department: department,
        courseNumber: courseNumber,
        sectionNumber: sectionNumber,
        semester: semester,
        active: active,
      },
    });
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
        label='Search by Course'
        onChange={(event) => searchCourses(event.target.value)}
        id='searchCourses'
      />
      <Table data-testid="course_table" sx={{minWidth: 500}}>
        <TableHead>
          <TableRow>
            <TableCell>Edit Course</TableCell>
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
              <TableCell>
                <Tooltip title="Edit Course">
                  <div onClick={() => editThisCourse(row.id, row.name,
                      row.department,
                      row.number, row.section, row.semester, row.active)} id={`row${row.id}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </div>
                </Tooltip>
              </TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.number}</TableCell>
              <TableCell>{row.section}</TableCell>
              <TableCell>{row.semester}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default function FacultyDash() {
  const [sessions, setSessions] = React.useState([]);
  const navigate = useNavigate();

  const handleQRCodeButtonClicked = (joinCode) => {
    navigate(`/generate-qr?joinCode=${joinCode}`);
  };

  useEffect(() => {
    async function getGames() {
      gameService.getGames().then((resp) => {
        const games = [...resp.data];
        getSessions(games);
      })
          .catch((error) => {
            alertService.alert({severity: alertSeverity.error, message: error});
          });
    }

    async function getSessions(games) {
      for (const game of games) {
        gameSessionService.getSessions(game.id)
            .then((resp) => {
              setSessions((oldSessions) => [...oldSessions, ...resp.data]);
            })
            .catch((error) => {
              alertService.alert({severity: alertSeverity.error, message: error});
            });
      }
    }
    getGames();
  }, []);

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
                  {sessionStorage.getItem('courses') ? JSON.parse(sessionStorage.getItem('courses')).length : 0}
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
              sx={{
                p: 2, display: 'flex', flexDirection: 'column',
                overflowX: 'auto',
              }}
            >
              <GameSessionsTable
                reportButtons
                qrCodes
                onQRCodeButtonClicked={handleQRCodeButtonClicked}
                gameSessions={sessions}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AuthenticatedLayout>
  );
}
