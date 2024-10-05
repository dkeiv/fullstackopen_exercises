import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import Togglable from './components/Togglable';
import NewBlog from './components/BlogForm';
import Notification from './components/Notification';

import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('login-user'));
    if (user) {
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = user => {
    setUser(user);
    blogService.setToken(user.token);
    window.localStorage.setItem('login-user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('login-user');
  };

  const createBlog = async newBlog => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.createBlog(newBlog);
      setMessage(`added a new blog: ${returnedBlog.title}`);
      setBlogs(blogs.concat(returnedBlog));
      setMessage({ content: 'Successfuly created new blog' });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (err) {
      console.log(err.response.data);
      setMessage({ content: err.response.data, isError: true });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const updateBlog = async updateBlog => {
    try {
      const returnedBlog = await blogService.updateBlog(updateBlog);
      setBlogs(blogs.map(b => (b.id === returnedBlog.id ? returnedBlog : b)));
    } catch (err) {
      console.log(err.response.data);
      setMessage({ content: err.response.data, isError: true });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const removeBlog = async id => {
    try {
      const response = await blogService.removeBlog(id);
      if (response.status === 204) {
        setMessage({ content: 'Successfuly deleted' });
        setTimeout(() => {
          setMessage(null);
        }, 3000);

        setBlogs(blogs.filter(b => b.id !== id));
      }
    } catch (err) {
      console.log(err.response.data);
      setMessage({ content: err.response.data, isError: true });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return user ? (
    <div>
      <h2>blogs</h2>
      {message && <Notification message={message} />}
      <span>{user.name} logged in </span>
      <button type='button' onClick={handleLogout}>
        logout
      </button>
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      {blogs
        .sort((b1, b2) => b2.likes - b1.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  ) : (
    <Login handleLogin={handleLogin} />
  );
};

export default App;
