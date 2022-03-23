import React from 'react';
import './app.css';
import Home from './pages/public/home';
import StartingSurvey from './components/game/startingSurvey';
import GameSession from './components/game/gameSession';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/public/login';
import Knowledge from './pages/public/knowledge';
import AdminDash from './pages/admin/dashboard';
import ProtectedRoute from './protectedRoute';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './store/store';
import CreateGamePage from './pages/admin/games/create';
import ViewGamesPage from './pages/admin/games/view';
import EditGamePage from './pages/admin/games/edit';
import {createBrowserHistory} from 'history';
import Logout from './pages/public/logout';
import FacultyDash from './pages/faculty/dashboard';
import Passcode from './pages/game/passcode';
import EndGame from './pages/game/endGame';
import GenerateQRPage from './pages/faculty/generateQR';

const history = createBrowserHistory();
const {persistor, store} = configureStore();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="startingSurvey" element={<StartingSurvey />} />
              <Route exact path="gameSession" element={<GameSession />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/started" element={<Knowledge />} />
              <Route exact path="/logout" element={<Logout />} />
              <Route exact path="/endGame" element={<EndGame />} />
              <Route
                exact
                path="/pass"
                element={
                  <Passcode data={{question: '/#', location: 'SC123'}} />
                }
              />
              <Route
                exact
                path="/admin-dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDash />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/faculty-dashboard"
                element={
                  <ProtectedRoute>
                    <FacultyDash />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/admin-dashboard/games"
                element={
                  <ProtectedRoute>
                    <ViewGamesPage />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/admin-dashboard/games/new"
                element={
                  <ProtectedRoute>
                    <CreateGamePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard/games/:id"
                element={
                  <ProtectedRoute>
                    <EditGamePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/generate-qr"
                element={
                  <ProtectedRoute>
                    <GenerateQRPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </PersistGate>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
