const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

describe('total likes', () => {
  const listWithZeroBlog = [];
  test('when list has zero blog, total likes is 0', () => {
    const result = listHelper.totalLikes(listWithZeroBlog);
    const expect = 0;
    assert.strictEqual(result, expect);
  });

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
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    const expect = 5;
    assert.strictEqual(result, expect);
  });

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
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0,
    },
  ];
  test('when list has many blogs, equals the likes of all blogs', () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    const expect = 12;
    assert.strictEqual(result, expect);
  });
});

describe('favorite blogs', () => {
  const listWithZeroBlog = [];
  test('when list has zero blog, return List is empty', () => {
    const result = listHelper.favoriteBlog(listWithZeroBlog);
    const expect = 'List is empty';
    assert(result, expect);
  });

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
  test('when list has one blog, return its only blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    const expect = listWithOneBlog[0];
    assert.deepStrictEqual(result, expect);
  });

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
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0,
    },
  ];
  test('when list has many blogs, return the blog that has the most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    const expect = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    };
    assert.deepStrictEqual(result, expect);
  });
});
