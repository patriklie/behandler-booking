import { Routes, Route, Navigate } from 'react-router';
import About from './pages/About.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MineAvtalerPage from './pages/MineAvtalerPage.jsx';
import LedigeTimerPage from './pages/LedigeTimerPage.jsx';
import Layout from './components/Layout.jsx';
import Profil from './pages/Profil.jsx';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';

export default function App() {
return (
  <Routes>
    <Route element={ <Layout /> }>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<About />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/avtaler" element={<MineAvtalerPage />} />
        <Route path="/timer" element={<LedigeTimerPage />} />
        <Route path="/profil" element={<Profil />} />
      </Route>
    </Route>
  </Routes>
)}