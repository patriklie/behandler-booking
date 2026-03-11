import { Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MineAvtalerPage from './pages/MineAvtalerPage.jsx';
import LedigeTimerPage from './pages/LedigeTimerPage.jsx';

export default function App() {
return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/avtaler" element={<MineAvtalerPage />} />
        <Route path="/timer" element={<LedigeTimerPage />} />
      </Routes>
)}