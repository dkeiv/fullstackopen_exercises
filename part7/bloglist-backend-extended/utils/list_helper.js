const lodash = require('lodash');

const totalLikes = blogs =>
  blogs.reduce((likes, blog) => likes + blog.likes, 0);

const favoriteBlog = blogs => {
  if (blogs.length === 0) return -1;
  return blogs.toSorted((b1, b2) => b1.likes - b2.likes).pop();
};

const mostBlogWithLodash = blogs => {
  if (blogs.length === 0) return -1;
  const counts = lodash.countBy(blogs, 'author');
  const authors = [];
  for (const author in counts) {
    authors.push({
      author,
      blogs: counts[author],
    });
  }
  return lodash.maxBy(authors, 'blogs');
};

const mostBlog = blogs => {
  if (blogs.length === 0) return -1;
  const countAuthorBlogs = blogs.reduce((countAuthorBlogs, blog) => {
    const countBlogs = countAuthorBlogs[blog.author] + 1 || 1;
    return { ...countAuthorBlogs, [blog.author]: countBlogs };
  }, {});

  const mostAuthor = Object.keys(countAuthorBlogs).reduce(
    (mostAuthor, author) =>
      !mostAuthor || countAuthorBlogs[author] >= countAuthorBlogs[mostAuthor]
        ? author
        : mostAuthor,
    ''
  );
  return { author: mostAuthor, blogs: countAuthorBlogs[mostAuthor] };
};

const mostLikes = blogs => {
  if (blogs.length === 0) return -1;
  const countAuthorLikes = blogs.reduce((countAuthorLikes, blog) => {
    const countLikes = countAuthorLikes[blog.author] + blog.likes || blog.likes;
    return { ...countAuthorLikes, [blog.author]: countLikes };
  }, {});

  const mostAuthor = Object.keys(countAuthorLikes).reduce(
    (mostAuthor, author) =>
      !mostAuthor || countAuthorLikes[author] >= countAuthorLikes[mostAuthor]
        ? author
        : mostAuthor,
    ''
  );

  return { author: mostAuthor, likes: countAuthorLikes[mostAuthor] };
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes,
};
