import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const auth = useSelector((store) => store.authenticated);
  
    return !auth ? (
      <Navigate to='/login' replace />
    ) : (
      children
    );
  };
  
  export default ProtectedRoute;