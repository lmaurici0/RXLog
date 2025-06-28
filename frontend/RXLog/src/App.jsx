import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/Home/homeScreen';
import DashBoard from './pages/DashBoard/DashBoard';  
import Cadaster from './pages/Cadaster/Cadaster';
import Login from './pages/Login/login';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Cadaster />} />
        <Route path="/home" element={<HomeScreen />} /> 
        <Route path='/dashboards' element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;