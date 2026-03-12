import { Routes, Route, Navigate } from 'react-router';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MineAvtalerPage from './pages/MineAvtalerPage.jsx';
import LedigeTimerPage from './pages/LedigeTimerPage.jsx';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
return (
  <Routes>
    <Route element={ <Layout /> }>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/avtaler" element={<MineAvtalerPage />} />
        <Route path="/timer" element={<LedigeTimerPage />} />
      </Route>
    </Route>
  </Routes>
)}