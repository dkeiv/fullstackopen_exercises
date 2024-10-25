import { Link } from 'react-router-dom';
import {
  useAuthValue,
  useAuthDispatch,
  logout,
} from '../context/slices/authSlice';

const Header = () => {
  const auth = useAuthValue();
  const authDispatch = useAuthDispatch();

  const handleLogout = () => {
    authDispatch(logout());
    window.localStorage.removeItem('login-user');
  };

  return (
    <nav>
      <Link to={'/'}> blogs </Link>
      <Link to={'/users'}> users </Link>
      <span> {auth.name} logged in </span>
      <button type='button' onClick={handleLogout}>
        logout
      </button>
    </nav>
  );
};

export default Header;
