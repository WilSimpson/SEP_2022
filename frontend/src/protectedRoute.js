import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import AuthService from './services/auth';

const ProtectedRoute = ({children}) => {
  const isLoggedIn = useSelector((store) => store.authenticated);

  return !isLoggedIn ? <Navigate to="/login" replace /> : children;
};

export function isAdmin() {
  return (AuthService.currentUser() ? AuthService.currentUser().role === 'ADMIN' : false);
};

export default ProtectedRoute;
