import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Header from './components/Header';
import Login from './components/Login';
import { UserContext } from './utils/userContext';
import client from './utils/apolloClient';
import Recommend from './components/Recommend';

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem('login-user'))
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('login-user');
    setUser(null);
    navigate('/authors');
    client.resetStore();
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header handleLogout={handleLogout} />

      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recommend' element={<Recommend />} />
        <Route path='*' element={<p>not found</p>} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
