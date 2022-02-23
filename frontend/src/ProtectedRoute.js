import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import configureStore from './store/store';

const {persistor, store} = configureStore();

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useSelector((store) => store.authenticated);
  
    return !isLoggedIn ? (
      <Navigate to='/login' replace />
    ) : (
      children
    );
  };
  
  export default ProtectedRoute;