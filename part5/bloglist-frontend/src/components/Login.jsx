import { useState } from 'react';
import loginService from '../services/login';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const login = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      handleLogin(user);
    } catch (err) {
      setErrorMsg('Wrong credentials');
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
    }
  };

  return (
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
      {errorMsg && <div>{errorMsg}</div>}
      <button type='submit'>login</button>
    </form>
  );
};

export default Login;
