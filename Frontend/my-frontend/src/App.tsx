import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Stations from './pages/Stations';
import Staff from './pages/Staff';
import Transactions from './pages/Transactions';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Nearby from './pages/Nearby';
import History from './pages/History';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/nearby" element={<Nearby />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
