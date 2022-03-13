import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const isLoggedIn = useSelector((store) => store.authenticated);

  return !isLoggedIn ? <Navigate to="/login" replace /> : children;
};

export default ProtectedRoute;
