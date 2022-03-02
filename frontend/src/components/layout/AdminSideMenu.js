import * as React from 'react';
import { Box, Link } from "@mui/material";
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
import AuthService from '../../services/auth.service';

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


export function AdminSideMenu () {   
    
    const [open, setOpen] = React.useState(true);
    const [gameManageOpen, setGameManageOpen] = React.useState(false);
    const [userManageOpen, setUserManageOpen] = React.useState(false);
    const [reportsOpen, setReportsOpen] = React.useState(false);
    const [helpOpen, setHelpOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
      };
  
      const handleGameManagement = () => {
        setGameManageOpen(!gameManageOpen);
      };
  
      const handleUserManagement = () => {
        setUserManageOpen(!userManageOpen);
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
        component={Link}
        data-testid='dashboard-item'
        href='/admin-dashboard'>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
    );

    const gameManagementItem = (
        <div>
            <ListItemButton 
            onClick={handleGameManagement} 
            disabled={!open}
            data-testid='game-manage-item'
            >
                <ListItemIcon>
                <AccountTree />
                </ListItemIcon>
                <ListItemText primary="Games" />
                {gameManageOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={gameManageOpen && open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} data-testid='game-develop-item'>
                        <ListItemText primary="Create Game" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} data-testid='game-view-item' component={Link} href="/admin-dashboard/games">
                        <ListItemText primary="View Games" />
                    </ListItemButton>
                </List>
             </Collapse>
        </div>
    );

    const userManagementItem = (
        <div>
          <ListItemButton 
          onClick={handleUserManagement} 
          disabled={!open}
          component={Link}
          data-testid='user-manage-item'
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {userManageOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={userManageOpen && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} data-testid='user-create-item'>  
                <ListItemText primary="Create Users" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} data-testid='user-edit-item'>
                <ListItemText primary="Edit Users" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} data-testid='user-view-item'>
                <ListItemText primary="View Users" />
              </ListItemButton>
            </List>
          </Collapse>
        </div>
    );

    const reportsItem = (
        <ListItemButton 
          onClick={handleReports} 
          disabled={!open}
          component={Link}
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
                    <ListItemButton sx={{ pl: 4 }} data-testid='getting-started-item'>  
                        <ListItemText primary="Getting Started" />
                    </ListItemButton>
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
                                {gameManagementItem}
                                {userManagementItem}
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
