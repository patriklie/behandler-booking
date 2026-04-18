import { Routes, Route, Navigate } from 'react-router';
import About from './pages/About.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import BookTimePage from './pages/BookTimePage.jsx';
import Layout from './components/Layout.jsx';
import Profil from './pages/Profil.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import MineTimerPage from './pages/MineTimerPage.jsx';
import Klinikk from './pages/Klinikk.jsx';

export default function App() {
return (
  <Routes>
    <Route element={ <Layout /> }>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<About />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/booktime" element={<BookTimePage />} />
        <Route path="/minetimer" element={<MineTimerPage />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/klinikk" element={<Klinikk />} />
      </Route>
    </Route>
  </Routes>
)}