import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

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

  const createBlog = async e => {
    e.preventDefault();

    try {
      const data = await blogService.createBlog(newBlog);
      console.log(data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const onNewBlogChange = e => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const creatBlogForm = () => {
    return (
      <form onSubmit={e => createBlog(e)}>
        <div>
          <label htmlFor='title'>title: </label>
          <input
            id='title'
            name='title'
            value={newBlog.title}
            onChange={e => onNewBlogChange(e)}
          />
        </div>
        <div>
          <label htmlFor='author'>author: </label>
          <input
            id='author'
            name='author'
            value={newBlog.author}
            onChange={e => onNewBlogChange(e)}
          />
        </div>
        <div>
          <label htmlFor='url'>url: </label>
          <input
            id='url'
            name='url'
            value={newBlog.url}
            onChange={e => onNewBlogChange(e)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    );
  };

  return user ? (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in</div>
      <button type='button' onClick={handleLogout}>
        logout
      </button>

      {creatBlogForm()}

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  ) : (
    <Login handleLogin={handleLogin} />
  );
};

export default App;
