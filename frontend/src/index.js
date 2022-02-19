import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import Login from './components/Login';
import AdminDash from './components/AdminDash';
import ProtectedRoute from './ProtectedRoute';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

const { persistor, store } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    
      <Router>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
            <Route exact path='/' element={<App />} />
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
