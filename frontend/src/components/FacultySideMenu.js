import * as React from 'react';
import { Box } from "@mui/material";
import { Divider } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AccountBox, AccountTree, Help } from '@material-ui/icons';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AuthService from '../services/auth.service';

const drawerWidth = 240;

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


export function FacultySideMenu () {

    const [open, setOpen] = React.useState(true);
    const [reportsOpen, setReportsOpen] = React.useState(false);
    const [helpOpen, setHelpOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
      };

      const handleReports = () => {
        setReportsOpen(!reportsOpen);
      }

      const handleHelp = () => {
        setHelpOpen(!helpOpen);
      }

    const dashboardItem = (
        <ListItemButton
        disabled={!open}
        data-testid='dashboard-item'
        href='/admin-dashboard'>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
    );

    const reportsItem = (
        <ListItemButton
          onClick={handleReports}
          disabled={!open}
          data-testid='reports-item'
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItemButton>
    );

    const logoutItem = (
        <ListItemButton
        disabled={!open}
        onClick={AuthService.logout}
        data-testid='logout-item'
        >
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
    );

    const helpItem = (
        <div>
            <ListItemButton
            onClick={handleHelp}
            disabled={!open}
            data-testid='help-item'>
                <ListItemIcon>
                    <Help />
                </ListItemIcon>
                <ListItemText primary="Help" />
                {helpOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={helpOpen && open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <div>
                    <ListItemButton sx={{ pl: 4 }} data-testid='getting-started-item'>
                        <ListItemText primary="Getting Started" />
                    </ListItemButton>
                    </div>
                    <ListItemButton sx={{ pl: 4 }} data-testid='about-item'>
                        <ListItemText primary="About" />
                    </ListItemButton>
                </List>
            </Collapse>
        </div>
    );


        return (
            <div>
                <Box sx={{ display: 'flex' }}>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer} data-testid='drawer-toggle'>
                            <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            <div>
                                {dashboardItem}
                            </div>
                            <div>
                                {reportsItem}
                            </div>
                            <Divider sx={{ my: 1 }} />
                            <div>
                                {logoutItem}
                                {helpItem}
                            </div>
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
                    </Box>
                </Box>
            </div>
        );
    }
