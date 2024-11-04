import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Header from './components/Header';
import Login from './components/Login';
import Recommend from './components/Recommend';
import { UserContext } from './utils/userContext';
import client from './utils/apolloClient';
import { ALL_BOOKS, BOOK_ADDED } from './utils/queryies';

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem('login-user'))
  );
  const navigate = useNavigate();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      window.alert('Added new book');
      const { addedBook } = data.data;

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
    },
  });

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
