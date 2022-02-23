import * as React from 'react';
import { 
    Box, 
    Card, 
    CardActionArea, 
    Grid, 
    Typography, Paper, Container } from "@material-ui/core";
    import Table from '@mui/material/Table';
    import TableBody from '@mui/material/TableBody';
    import TableCell from '@mui/material/TableCell';
    import TableHead from '@mui/material/TableHead';
    import TableRow from '@mui/material/TableRow';
import { LibraryAdd, Assessment, AccountBox, AccountTree } from '@material-ui/icons';
import { ChevronLeftIcon } from '@material-ui/icons';
import { Divider } from '@material-ui/core';
import MuiDrawer from '@mui/material/Drawer';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';


function createData(id, name, starttime, endtime, gamecode) {
    return { id, name, starttime, endtime, gamecode};
  }

  const rows = [
    createData(
      0,
      'Biomedical',
      '2022-05-01',
      '2022-05-30',
      'AKXHFI',
    ),
    createData(
        0,
        'Biomedical',
        '2022-05-01',
        '2022-05-30',
        'AKXHFI',
      ),
      createData(
        0,
        'Biomedical',
        '2022-05-01',
        '2022-05-30',
        'AKXHFI',
      ),
      createData(
        0,
        'Biomedical',
        '2022-05-01',
        '2022-05-30',
        'AKXHFI',
      ),
      createData(
        0,
        'Biomedical',
        '2022-05-01',
        '2022-05-30',
        'AKXHFI',
      ),
      createData(
        0,
        'Biomedical',
        '2022-05-01',
        '2022-05-30',
        'AKXHFI',
      ),
  ];

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

  function Courses() {
      return (
      <React.Fragment>
        <Typography component="h2" variant="h6" gutterBottom>
            Active Game Sessions
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Game Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.starttime}</TableCell>
                <TableCell>{row.endtime}</TableCell>
                <TableCell>{row.gamecode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>);
  }


export default function AdminDash () {


  return (
    <div>
         <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    
                    {/* Courses Table */}
                    <Grid item xs={12} md={8} lg={6}>
                        <Paper
                        sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                        }}>
                            <Courses />
                        </Paper>
                    </Grid>

                    <Grid item xs={6} md={2} lg={3}>
                        <Card>
                            <CardActionArea>
                                <Paper
                                sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                                }}>
                                    <Assessment fontSize="large" />
                                    <Typography>View Reports</Typography>
                                </Paper>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item xs={6} md={2} lg={3}>
                        <Card>
                            <CardActionArea>
                                <Paper
                                sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                                }}>
                                    <LibraryAdd fontSize="large" />
                                    <Typography>Start New Session</Typography>
                                </Paper>
                            </CardActionArea>
                        </Card>
                       
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                        <Card>
                            <CardActionArea></CardActionArea>
                        </Card>
                        <Paper
                        sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                        }}>
                            <AccountBox fontSize="large" />
                            <Typography>User Management</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                        <Card>
                            <CardActionArea></CardActionArea>
                        </Card>
                        <Paper
                        sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                        }}>
                            <AccountTree fontSize="large" />
                            <Typography>Develop Game</Typography>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Box>
        {/* <Box
        >
           
            <Grid 
            container 
            spacing={{ xs: 2, md: 3 }} 
            columns={{ xs: 4, sm: 8, md: 12 }}
            alignItems="center"
            justifyContent="center"
            >
                
                <Grid item xs={2} sm={4} md={4} sx={{ flexGrow: 1 }}>
                    <Card sx={{ minWidth: 275 }} elevation={8}>
                        <CardActionArea>
                            <LibraryAdd fontSize="large" />
                            <Typography>Start Session</Typography>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={2} sm={4} md={4} sx={{ flexGrow: 1 }}>
                    <Card sx={{ minWidth: 275 }} elevation={8}>
                        <CardActionArea>
                            <LibraryAdd fontSize="large" />
                            <Typography>Start Session</Typography>
                        </CardActionArea>
                    </Card>
                </Grid>
               
            </Grid>
        </Box> */}
        
    </div>
    
  );
}