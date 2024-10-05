const blogRouter = require('express').Router();
const Blog = require('../models/blog');
// const User = require('../models/user');
// const jwt = require('jsonwebtoken');
const middlewares = require('../utils/middlewares');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogRouter.post(
  '/',
  middlewares.userExtractor,
  async (request, response, next) => {
    try {
      const user = request.user;
      if (!request.body.title) {
        return response.status(400).json({
          status: 'fail',
          message: 'missing title',
        });
      }

      const blog = new Blog({
        ...request.body,
        user: user._id,
      });

      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.delete(
  '/:id',
  middlewares.userExtractor,
  async (request, response, next) => {
    try {
      const user = request.user;

      const blog = await Blog.findById(request.params.id);
      if (!blog) {
        return response.status(404).end();
      }

      if (user._id.toString() === blog.user.toString()) {
        await Blog.findByIdAndDelete(request.params.id);
        return response.status(204).end();
      } else {
        return response.status(401).json({ error: 'invalid user' });
      }
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.put(
  '/:id',
  middlewares.userExtractor,
  async (request, response, next) => {
    try {
      const user = request.user;
      const blog = await Blog.findById(request.params.id);
      if (!blog) {
        return response.status(404).end();
      }

      if (user._id.toString() === blog.user.toString()) {
        const updatedBlog = await Blog.findByIdAndUpdate(
          request.params.id,
          request.body,
          { new: true }
        ).populate('user', {
          username: 1,
          name: 1,
        });
        return response.status(200).json(updatedBlog);
      } else {
        return response.status(401).json({ error: 'invalid user' });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = blogRouter;
