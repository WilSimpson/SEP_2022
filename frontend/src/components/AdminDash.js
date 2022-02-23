import { Button } from '@mui/material';
import React from 'react';
import AuthService from '../services/auth.service';

export default function AdminDash () {


  const handleLogout = (event) => {
    AuthService.logout();
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
    
  );
}


