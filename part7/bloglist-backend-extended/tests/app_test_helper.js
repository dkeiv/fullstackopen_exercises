const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Proin erat mauris, dignissim sit amet neque eu.',
    author: 'Mauris pellentesque',
    url: 'https://www.yahoo.com/news/',
    likes: 0,
  },
  {
    title: 'Duis dignissim elit vel eros luctus sollicitudin.',
    author: 'Vivamus blandit',
    url: 'https://www.yahoo.com/news/',
    likes: 2,
  },
];

const getAllBlogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const getAllUserInDB = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialBlogs,
  getAllBlogsInDB,
  getAllUserInDB,
};
