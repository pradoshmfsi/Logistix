import { Navigate, Outlet } from 'react-router-dom';

function LoggedOutRoutes() {
  return localStorage.getItem('user') ? (
    <Navigate to="/dashboard" />
  ) : (
    <Outlet />
  );
}

export default LoggedOutRoutes;
