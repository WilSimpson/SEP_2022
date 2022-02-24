import * as React from 'react';
import { SideMenu } from './SideMenu';

export default function AdminDash () {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
         <SideMenu />
    </div>
    
  );
}
