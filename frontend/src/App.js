import './App.css';
import Home from './pages/public/home';
import Nav from './components/layout/nav';
import Footer from './components/layout/stickyFooter';
import StartingSurvey from './components/game/startingSurvey';
import GameSession from './components/game/gameSession';
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import Login from './pages/public/Login';
import Knowledge from './pages/public/Knowledge';
import AdminDash from './pages/admin/AdminDash';
import ProtectedRoute from './ProtectedRoute';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store/store';
import GamesTable from './components/admin/GamesTable';
import ViewGamesPage from './pages/admin/games/ViewGames';

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
                <Route 
                  exact
                  path='/admin-dashboard' 
                  element={
                  <ProtectedRoute>
                    <AdminDash />
                  </ProtectedRoute>
                  }
                />
                <Route exact path='/admin-dashboard/games' element={
                  <ProtectedRoute>
                    <ViewGamesPage />
                  </ProtectedRoute>
                } />
              </Routes>
              </PersistGate>
          </Provider>
        </Router>
      <Footer />
    </div>
  );
}

export default App;
