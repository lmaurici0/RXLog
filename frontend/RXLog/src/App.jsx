import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/Home/homeScreen';
import DashBoard from './pages/DashBoard/DashBoard';  
import Cadaster from './pages/Cadaster/Cadaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/home" element={<DashBoard />} /> 
        <Route path="/signin" element={<Cadaster />} /> 
      </Routes>
    </Router>
  );
}

export default App;
