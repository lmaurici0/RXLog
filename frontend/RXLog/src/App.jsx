import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from './pages/AuthPage/AuthPage';
import DashBoard from './pages/DashBoard/DashBoard';
import MedicamentRegistration from './pages/MedicamentRegister/MedicamentRegistration';
import MedicamentExit from './pages/MedicamentExit/MedicamentExit';
import HomeScreen from './pages/Home/homeScreen';
import Contact from './pages/Contact/Contact';
import Profile from './pages/Profile/Profile';
import Unauthorized from './pages/Error/401/Unauthorized';
import Forbidden from './pages/Error/403/Forbidden';
import PageNotFound from './pages/Error/404/PageNotFound';

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/unauthorized" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboards" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
        <Route path="/medicamentos/cadastro" element={<PrivateRoute><MedicamentRegistration /></PrivateRoute>} />
        <Route path="/medicamentos/saida" element={<PrivateRoute><MedicamentExit /></PrivateRoute>} />
        <Route path="/sobre" element={<HomeScreen />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/error/403" element={<Forbidden />} />
        <Route path="/error/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
