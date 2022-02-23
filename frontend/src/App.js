import './App.css';
import Home from './components/home'
import AdminDash from './components/AdminDash';
import NavBar from './components/nav';
import StickyFooter from './components/stickyFooter';

function App() {
  return (
    <div className="App">
      <NavBar />
      <AdminDash />
      <StickyFooter />
    </div>
  );
}

export default App;
