const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (request.body.title) {
    return response.status(400).json({
      status: 'fail',
      message: 'missing title',
    });
  }

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }
  console.log(blog);
  return response.status(204).end();
});

blogRouter.patch('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  if (!blog) {
    return response.status(404).end();
  }

  return response.status(200).json(blog);
});

module.exports = blogRouter;
