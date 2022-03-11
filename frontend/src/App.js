import './App.css';
import Home from './components/home';
import Nav from './components/nav';
import Footer from './components/stickyFooter';
import StartingSurvey from './components/startingSurvey';
import GameSession from './components/gameSession';
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import Login from './components/Login';
import Knowledge from './components/knowledge';
import AdminDash from './components/AdminDash';
import Passcode from './components/passcode';
import ProtectedRoute from './ProtectedRoute';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store/store';

const { persistor, store } = configureStore();



function App() {
  return (
    <div className="App">
      <Nav />
        <Router>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='startingSurvey' element={<StartingSurvey />} />
                <Route exact path='gameSession' element={<GameSession />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/started' element={<Knowledge />} />
                <Route exact path='/pass' element={<Passcode data={{question:"/#", location:"SC123"}} />} />
                <Route 
                  exact
                  path='/admin-dashboard' 
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
      <Footer />
    </div>
  );
}

export default App;
