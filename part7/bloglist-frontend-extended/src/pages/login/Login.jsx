import { useState } from 'react';
import loginService from '../../services/login';
import {
  clearNoti,
  createNoti,
  useNotificationDispatch,
} from '../../context/slices/notiSlice';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useNotificationDispatch();

  const login = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      handleLogin(user);
    } catch (err) {
      dispatch(
        createNoti({ content: err.response?.data.message, error: true })
      );
      setTimeout(() => {
        dispatch(clearNoti());
      }, 3000);
    }
  };

  return (
    <>
      <h1>login to application</h1>
      <form onSubmit={e => login(e)}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  );
};

export default Login;
