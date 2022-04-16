import React from 'react';
import './app.css';
import Home from './pages/public/home';
import StartingSurvey from './pages/game/startingSurvey';
import GameSession from './components/game/gameSession';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import EditPassword from './pages/faculty/editPassword';
import ForgotPassword from './pages/faculty/forgotPassword';
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
import StartGameSession from './pages/faculty/games/startGameSession';
import Register from './pages/admin/register';
import AddCourse from './pages/faculty/addCourse';
import EndGame from './pages/game/endGame';
import GenerateQRPage from './pages/faculty/generateQR';
import ReportsPage from './pages/faculty/reports/reports';
import EditCourse from './pages/faculty/editCourse';
import ReportPage from './pages/faculty/reports/report';
import ViewReportPage from './pages/faculty/reports/view.tsx';

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
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/endGame" element={<EndGame />} />
              <Route exact path="/forgot" element={<ForgotPassword />} />
              <Route exact path="/changePassword" element={<EditPassword />} />
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
                path="/faculty-dashboard/addCourse"
                element={
                  <ProtectedRoute>
                    <AddCourse />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/faculty-dashboard/editCourse"
                element={
                  <ProtectedRoute>
                    <EditCourse />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/admin-dashboard/register"
                element={
                  <ProtectedRoute>
                    <Register />
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
                exact
                path="/faculty-dashboard/startSession"
                element={
                  <ProtectedRoute>
                    <StartGameSession />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/admin-dashboard/startSession"
                element={
                  <ProtectedRoute>
                    <StartGameSession />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/generate-qr"
                element={
                  <ProtectedRoute>
                    <GenerateQRPage />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/reports"
                element={
                  <ProtectedRoute>
                    <ReportsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/reports/:id"
                element={
                  <ProtectedRoute>
                    <ReportPage />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/reports/:id/view"
                element={
                  <ProtectedRoute>
                    <ViewReportPage />
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
