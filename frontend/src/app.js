import React, {useState, useEffect} from 'react';
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
import {isAdmin} from './protectedRoute';
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
import ViewCoursePage from './pages/faculty/viewCourse';
import {
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';
import Settings from './pages/public/settings';

const history = createBrowserHistory();
const {persistor, store} = configureStore();

const lightTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#6A8EAE', // lighter blue
    },
    secondary: {
      main: '#57A773', // green
      contrastText: '#ffffff',
    },
  },
};
const darkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#F3EFE0', // off white
    },
    secondary: {
      main: '#006DAA', // blue
    },
  },
};

function App(props) {
  const [currentTheme, setCurrentTheme] = useState(createTheme(lightTheme));

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', JSON.stringify(lightTheme));
      localStorage.setItem('dark', false);
      setCurrentTheme(createTheme(lightTheme));
    } else {
      const theme = JSON.parse(localStorage.getItem('theme'));
      setCurrentTheme(createTheme(theme));
    }
  }, []);

  function handleThemeChange() {
    const isDarkTheme = (localStorage.getItem('dark') === 'true');
    const appliedTheme = createTheme(isDarkTheme ? lightTheme : darkTheme);
    localStorage.setItem('theme', JSON.stringify(appliedTheme));
    localStorage.setItem('dark', !isDarkTheme);
    setCurrentTheme(createTheme(appliedTheme));
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <div className="App">
        <Router history={history}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="startingSurvey" element={<StartingSurvey />} />
                <Route exact path="gameSession" element={<GameSession />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/help" element={<Knowledge />} />
                <Route exact path="/logout" element={<Logout />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/endGame" element={<EndGame />} />
                <Route exact path="/forgot" element={<ForgotPassword />} />
                <Route exact path="/changePassword" element={<EditPassword />} />
                <Route exact path="/settings" element={<Settings id='settings' handleTheme={handleThemeChange}/>} />
                <Route
                  exact
                  path="/pass"
                  element={
                    <Passcode data={{question: '/#', location: 'SC123'}} />
                  }
                />
                <Route
                  exact
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      {isAdmin() ? <AdminDash /> : <FacultyDash />}
                    </ProtectedRoute>
                  }
                />

                <Route
                  exact
                  path="/dashboard/addCourse"
                  element={
                    <ProtectedRoute>
                      {isAdmin() ? <AdminDash /> : <AddCourse />}
                    </ProtectedRoute>
                  }
                />

                <Route
                  exact
                  path="/dashboard/viewCourses"
                  element={
                    <ProtectedRoute>
                      {isAdmin() ? <AdminDash /> : <ViewCoursePage />}
                    </ProtectedRoute>
                  }
                />

                <Route
                  exact
                  path="/dashboard/editCourse"
                  element={
                    <ProtectedRoute>
                      {isAdmin() ? <AdminDash /> : <EditCourse />}
                    </ProtectedRoute>
                  }
                />

                <Route
                  exact
                  path="/dashboard/register"
                  element={
                    <ProtectedRoute>
                      {isAdmin() ? <Register /> : <FacultyDash />}
                    </ProtectedRoute>
                  }
                />

                <Route
                  exact
                  path="/dashboard/games"
                  element={
                    <ProtectedRoute>
                      {isAdmin() ? <ViewGamesPage /> : <FacultyDash />}
                    </ProtectedRoute>
                  }
                />

                <Route
                  exact
                  path="/dashboard/games/new"
                  element={
                    <ProtectedRoute>
                      {isAdmin() ? <CreateGamePage /> : <FacultyDash />}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/games/:id"
                  element={
                    <ProtectedRoute>
                      {isAdmin() ? <EditGamePage /> : <FacultyDash />}
                    </ProtectedRoute>
                  }
                />
                <Route
                  exact
                  path="/dashboard/startSession"
                  element={
                    <ProtectedRoute>
                      <StartGameSession />
                    </ProtectedRoute>
                  }
                />
                <Route
                  exact
                  path="/dashboard/startSession"
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
    </ThemeProvider>
  );
}

export default App;
