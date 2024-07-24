import { Navigate, Outlet } from 'react-router-dom';
import Appbar from './Appbar';

function Layout() {
  return localStorage.getItem('user') ? (
    <>
      <Appbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default Layout;
