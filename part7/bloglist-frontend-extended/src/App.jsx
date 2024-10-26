import { useEffect } from 'react';
import { Notification, PrivateRoutes } from './components';
import {
  clearNoti,
  createNoti,
  useNotificationDispatch,
} from './context/slices/notiSlice';
import { login, useAuthDispatch } from './context/slices/authSlice';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { NotFound, BlogList, UserList, Blog, User } from './pages';
import { Login } from './pages';

const App = () => {
  const notiDispatch = useNotificationDispatch();
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loginUser = JSON.parse(window.localStorage.getItem('login-user'));

    if (loginUser) {
      authDispatch(login(loginUser));
    }
  }, []);

  const handleLogin = (user) => {
    authDispatch(login(user));

    window.localStorage.setItem('login-user', JSON.stringify(user));
    navigate('/');

    notiDispatch(createNoti({ content: 'welcome back' }));
    setTimeout(() => {
      notiDispatch(clearNoti());
    }, 3000);
  };

  return (
    <>
      <Notification />
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:blogID" element={<Blog />} />

          <Route path="/users" element={<UserList />} />
          <Route path="/users/:userID" element={<User />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
