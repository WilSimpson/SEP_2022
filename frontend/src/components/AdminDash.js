import { Button } from '@mui/material';
import React from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export default function AdminDash () {

  let navigate = useNavigate();

  const handleLogout = (event) => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
    
  );
}


