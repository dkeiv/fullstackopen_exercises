const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const listWithZeroBlog = [];
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
];

const listWithManyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

describe('total likes', () => {
  test('when list has zero blog, total likes is 0', () => {
    const actual = listHelper.totalLikes(listWithZeroBlog);
    const expect = 0;
    assert.strictEqual(actual, expect);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const actual = listHelper.totalLikes(listWithOneBlog);
    const expect = 5;
    assert.strictEqual(actual, expect);
  });

  test('when list has many blogs, equals the likes of all blogs', () => {
    const actual = listHelper.totalLikes(listWithManyBlogs);
    const expect = 36;
    assert.strictEqual(actual, expect);
  });
});

describe('favorite blogs', () => {
  test('when list has zero blog, return -1', () => {
    const actual = listHelper.favoriteBlog(listWithZeroBlog);
    const expect = -1;
    assert(actual, expect);
  });

  test('when list has one blog, return its only blog', () => {
    const actual = listHelper.favoriteBlog(listWithOneBlog);
    const expect = listWithOneBlog[0];
    assert.deepStrictEqual(actual, expect);
  });

  test('when list has many blogs, return the blog that has the most likes', () => {
    const actual = listHelper.favoriteBlog(listWithManyBlogs);
    const expect = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    };
    assert.deepStrictEqual(actual, expect);
  });
});

describe('author has the most blogs', () => {
  test('when list has zero blog, return -1', () => {
    const actual = listHelper.mostBlog(listWithZeroBlog);
    const expect = -1;
    assert(actual, expect);
  });

  test('when list has one blog, return its only author with 1 blog', () => {
    const actual = listHelper.mostBlog(listWithOneBlog);
    const expect = { author: 'Edsger W. Dijkstra', blogs: 1 };
    assert.deepStrictEqual(actual, expect);
  });

  test('when list has many blogs, return the author who has the most blog', () => {
    const actual = listHelper.mostBlog(listWithManyBlogs);
    const expect = { author: 'Robert C. Martin', blogs: 3 };
    assert.deepStrictEqual(actual, expect);
  });
});

describe('author has the most likes', () => {
  test('when list has zero blog, return -1', () => {
    const actual = listHelper.mostLikes(listWithZeroBlog);
    const expect = -1;
    assert(actual, expect);
  });

  test('when list has one blog, return its only author their likes', () => {
    const actual = listHelper.mostLikes(listWithOneBlog);
    const expect = { author: 'Edsger W. Dijkstra', likes: 5 };
    assert.deepStrictEqual(actual, expect);
  });

  test('when list has many blogs, return the author who has the most likes', () => {
    const actual = listHelper.mostLikes(listWithManyBlogs);
    const expect = { author: 'Edsger W. Dijkstra', likes: 17 };
    assert.deepStrictEqual(actual, expect);
  });
});
