import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const onNewBlogChange = e => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    createBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
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

export default BlogForm;
