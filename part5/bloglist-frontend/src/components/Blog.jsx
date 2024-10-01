const Blog = ({ blog }) => (
  <div>
    {blog.title} <i className='nf nf-fa-pen'></i> {blog.author}
  </div>
);

export default Blog;
