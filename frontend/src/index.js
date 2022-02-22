import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import Login from './components/Login';
import Home from './components/home';
import AdminDash from './components/AdminDash';
import ProtectedRoute from './ProtectedRoute';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core';

const { persistor, store } = configureStore();

const theme = createTheme({
  palette: {
     primary: {
        main: '#AFD0BF'
               },
     secondary: {
        main: '#e2efde'
                }
           },
fontFamily: "Roboto"
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    <Router>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route 
              exact
              path='/admin' 
              element={
              <ProtectedRoute>
                <AdminDash />
              </ProtectedRoute>
              }
            />
          </Routes>
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
