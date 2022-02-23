import './App.css';
import Home from './components/home';
import Nav from './components/nav';
import Footer from './components/stickyFooter';
import StartingSurvey from './components/startingSurvey';
import GameSession from './components/gameSession';
import { Routes,  Route} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Nav />
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='startingSurvey' element={<StartingSurvey />} />
                <Route exact path='gameSession' element={<GameSession />} />
              </Routes>
      <Footer />
    </div>
  );
}

export default App;
