import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/Home/homeScreen';
import DashBoard from './pages/DashBoard/DashBoard';  
import Cadaster from './pages/Cadaster/Cadaster';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cadaster />} />
        <Route path="/dashboard" element={<DashBoard />} /> 
        <Route path='/sobre' element={<HomeScreen />} />
        <Route path='/contato' element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
