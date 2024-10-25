import { useAuthValue } from '../context/slices/authSlice';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header';

const PrivateRoutes = () => {
  const auth =
    useAuthValue() || JSON.parse(window.localStorage.getItem('login-user'));
  return auth ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoutes;
