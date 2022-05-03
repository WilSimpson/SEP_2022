import React from 'react';
import {
  Tooltip,
  Typography,
  Table,
  IconButton,
  TextField,
} from '@mui/material';
import {TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import {useState} from 'react';
import courseService from '../../services/courses';
import {LinearProgress} from '@mui/material';
import {Box} from '@mui/system';
import AuthService from '../../services/auth';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {alertService, alertSeverity} from '../../services/alert';

export default function CoursesTable(props) {
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
      alertService.alert({
        severity: alertSeverity.error,
        message: 'Unable to retrieve your courses.',
      });
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
