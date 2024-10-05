import { useState } from 'react';

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [isShown, setIsShown] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async e => {
    e.preventDefault();
    updateBlog({ ...blog, likes: blog.likes + 1 });
  };

  const handleRemove = e => {
    e.preventDefault();
    if (window.confirm(`Remove: ${blog.title} (by ${blog.author})`)) {
      removeBlog(blog.id);
    }
  };

  const toggleShow = () => {
    setIsShown(!isShown);
  };

  const blogDetail = () => (
    <>
      <p>{blog.url}</p>
      <p>
        likes: {blog.likes}{' '}
        <button onClick={e => handleLike(e)}>
          <i className='nf nf-fa-thumbs_up'></i>
        </button>
      </p>
      <p>{blog.user.name}</p>
      <button onClick={e => handleRemove(e)}>
        remove <i className='nf nf-fa-trash_can'></i>
      </button>
    </>
  );

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} (by {blog.author})
        <button onClick={toggleShow}>{isShown ? 'hide' : 'show'}</button>
      </p>
      {isShown && blogDetail()}
    </div>
  );
};

export default Blog;
