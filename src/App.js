import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home"
import Player from './components/Player';
import Search from './components/Search';
import Sidebar from './components/Sidebar';
import AddSongForm from './components/AddSongForm';

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player />} />
        <Route path="/search" element={<Search />} />
        <Route path="/add-song" element={<AddSongForm />} />
      </Routes>
    </Router>
    
  );
}

export default App;
