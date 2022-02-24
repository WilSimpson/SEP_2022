import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { LibraryAdd, Assessment, AccountBox, AccountTree } from '@material-ui/icons';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


export class AdminDashItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gameManageOpen: false,
      userManageOpen: false,
      reportsOpen: false,
      open: false
    };
  };


  
    handleClick = () => {
      this.setState({open: !this.state.open});
    };

    handleGameManagement = () => {
      this.setState({gameManageOpen: !this.state.gameManageOpen});
    };

    handleUserManagement = () => {
      this.setState({userManageOpen: !this.state.userManageOpen});
    };

    handleReports = () => {
      this.setState({reportsOpen: !this.state.reportsOpen});
    }

    render () {
      return (
    
        <React.Fragment>
          {/* --------------------Dashboard Button-------------------------- */}
          <ListItemButton disabled={!this.props.parentToChild}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          {/* --------------------Game Management Button-------------------------- */}
          <ListItemButton 
          onClick={this.handleGameManagement} 
          disabled={!this.props.parentToChild}>
            <ListItemIcon>
              <AccountTree />
            </ListItemIcon>
            <ListItemText primary="Games" />
            {this.state.gameManageOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.gameManageOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Develop Game" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Edit Game" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="View Games" />
              </ListItemButton>
            </List>
          </Collapse>
    
          {/* --------------------User Management Button-------------------------- */}
          <ListItemButton 
          onClick={this.handleUserManagement} 
          disabled={!this.props.parentToChild}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {this.state.userManageOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.userManageOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>  
                <ListItemText primary="Create Users" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Edit Users" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="View Users" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* --------------------Reports Button-------------------------- */}
          <ListItemButton 
          onClick={this.handleReports} 
          disabled={!this.props.parentToChild}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>          
        </React.Fragment>
      );
    }
  
}

export class LogoutMenu extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return(
      <React.Fragment>
        <ListItemButton disabled={!this.props.parentToChild}>
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </React.Fragment>
    );
  }
  
}