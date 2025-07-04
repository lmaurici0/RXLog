import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/Home/homeScreen';
import DashBoard from './pages/DashBoard/DashBoard';  
import AuthPage from './pages/AuthPage/AuthPage';
import Contact from './pages/Contact/Contact';
import PageNotFound from './pages/Error/404/PageNotFound';
import Forbidden from './pages/Error/403/Forbidden';
import Unauthorized from './pages/Error/401/Unauthorized';
import Profile from './pages/Profile/Profile';
import MedicamentRegistration from './pages/MedicamentRegister/MedicamentRegistration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashBoard />} /> 
        <Route path='/sobre' element={<HomeScreen />} />
        <Route path='/contato' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/registration' element={<MedicamentRegistration />} />
        
        <Route path='/error/401' element={<Unauthorized />} />
        <Route path='/error/403' element={<Forbidden />} />
        <Route path='/error/404' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
