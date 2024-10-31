import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/queryies';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/userContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      console.log(error);
    },
    onCompleted: data => {
      navigate('/author');
      localStorage.setItem('login-user', JSON.stringify(data.login));
      setUser(data.login);
      setUsername('');
      setPassword('');
    },
  });

  const handleLogin = e => {
    e.preventDefault();

    console.log(username, password);

    login({ variables: { username, password } });
  };
  return (
    <div className='mx-2'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='py-2'>
          <label htmlFor='username'>username</label>
          <input
            className='border rounded-md border-slate-400 mx-1 leading-6'
            id='username'
            name='username'
            type='text'
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className='py-2'>
          <label htmlFor='password'>password</label>
          <input
            className='border rounded-md border-slate-400 mx-1 leading-6'
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            type='submit'
            className='border-slate-400 border rounded px-3 py-1.5'
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
