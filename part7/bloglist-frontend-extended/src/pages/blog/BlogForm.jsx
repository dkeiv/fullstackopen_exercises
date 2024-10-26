import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const onNewBlogChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <form className='mx-auto max-w-sm' onSubmit={(e) => handleSubmit(e)}>
      <div className='mb-5'>
        <input
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500'
          id='title'
          name='title'
          placeholder='title'
          value={newBlog.title}
          onChange={(e) => onNewBlogChange(e)}
        />
      </div>
      <div className='mb-5'>
        <input
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500'
          id='author'
          name='author'
          placeholder='author'
          value={newBlog.author}
          onChange={(e) => onNewBlogChange(e)}
        />
      </div>
      <div className='mb-5'>
        <input
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500'
          id='url'
          name='url'
          placeholder='url'
          value={newBlog.url}
          onChange={(e) => onNewBlogChange(e)}
        />
      </div>
      <button
        className='mb-1 rounded-lg border border-blue-700 px-5 py-1 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800'
        type='submit'
      >
        create
      </button>
    </form>
  );
};

export default BlogForm;
