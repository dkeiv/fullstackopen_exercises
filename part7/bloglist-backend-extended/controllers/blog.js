const blogRouter = require('express').Router();
const Blog = require('../models/blog');
// const User = require('../models/user');
// const jwt = require('jsonwebtoken');
const middlewares = require('../utils/middlewares');

blogRouter.get('/', middlewares.userExtractor, async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.post('/', middlewares.userExtractor, async (req, res, next) => {
  try {
    const user = req.user;
    if (!req.body.title) {
      return res.status(400).json({
        status: 'fail',
        message: 'missing title',
      });
    }

    const blog = new Blog({
      ...req.body,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.get('/:id', middlewares.userExtractor, async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: id }).populate('user', {
      id: 1,
      username: 1,
      name: 1,
    });

    if (!blog) {
      return res.status(404).end();
    }

    return res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', middlewares.userExtractor, async (req, res, next) => {
  try {
    const user = req.user;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).end();
    }

    if (user._id.toString() === blog.user.toString()) {
      await Blog.findByIdAndDelete(req.params.id);
      return res.status(204).end();
    } else {
      return res.status(401).json({ error: 'invalid user' });
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.put('/:id', middlewares.userExtractor, async (req, res, next) => {
  try {
    const user = req.user;
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).end();
    }

    if (user._id.toString() === blog.user.toString()) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate('user', {
        username: 1,
        name: 1,
      });
      return res.status(200).json(updatedBlog);
    } else {
      return res.status(401).json({ error: 'invalid user' });
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.post(
  '/:id/comments',
  middlewares.userExtractor,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const blog = await Blog.findOne({ _id: id }).populate('user', {
        id: 1,
        username: 1,
        name: 1,
      });

      if (!blog) return res.status(404).end();

      blog.comments.push(content);
      await blog.save();

      return res.status(201).json(blog);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = blogRouter;
