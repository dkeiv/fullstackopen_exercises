const totalLikes = blogs =>
  blogs.reduce((likes, blog) => likes + blog.likes, 0);

const favoriteBlog = blogs => {
  if (blogs.length === 0) return 'List is empty';
  return blogs.toSorted((b1, b2) => b1.likes - b2.likes).pop();
};

const mostBlog = blogs => {
  if (blogs.length === 0) return 'List is empty';
  const result = { author, blogs };

  return result;
};

module.exports = {
  totalLikes,
  favoriteBlog,
};
