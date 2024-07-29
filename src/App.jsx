import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import LoggedOutRoutes from './components/LoggedOutRoutes';
import Layout from './layout/Layout';
import Shipment from './pages/Shipment/Shipment';
import { DashboardProvider } from './store/DashboardContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoggedOutRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <DashboardProvider>
                <Dashboard />
              </DashboardProvider>
            }
          />
          <Route path="/shipment/:shipmentId" element={<Shipment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
