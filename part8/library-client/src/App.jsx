import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
