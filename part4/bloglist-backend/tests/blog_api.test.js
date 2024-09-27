const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const testHelper = require('./blog_test_helper');
const app = require('../app');

const api = supertest(app);

// <<==============>>
//  initializing data
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of testHelper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

// <<==============>>
test('blogs are in json format', async () => {
  await api
    .get('/api/v1/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all two (2) blogs are returned', async () => {
  const res = await api.get('/api/v1/blogs');

  assert.strictEqual(res.body.length, testHelper.initialBlogs.length);
});

test('blogs unique identifier property is named id', async () => {
  const response = await api.get('/api/v1/blogs');

  assert.ok(response.body[0].id);
  assert.strictEqual(response.body[0]._id, undefined);
});

test('create new blog', async () => {
  const newBlog = {
    title: 'New blog to be deleted',
    author: 'local',
    url: 'http://localhost',
    likes: 0,
  };
  await api
    .post('/api/v1/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const updatedBlogs = await testHelper.getAllBlogsInDB();

  assert.strictEqual(updatedBlogs.length, testHelper.initialBlogs.length + 1);

  const titles = updatedBlogs.map(b => b.title);
  assert(titles.includes(newBlog.title));
});

test('missing likes property, returns likes = 0', async () => {
  const missingLikesBlog = {
    title: 'This blog is missing likes property.',
    author: 'local',
    url: 'http://localhost',
  };

  const res = await api.post('/api/v1/blogs').send(missingLikesBlog);

  assert.strictEqual(res.body.likes, 0);
});

test('missing title property, returns 400', async () => {
  const missingTitleBlog = {
    author: 'local',
    url: 'http://localhost',
  };

  await api.post('/api/v1/blogs').send(missingTitleBlog).expect(400);
});

test('missing url property, returns 400', async () => {
  const missingUrlBlog = {
    title: 'This blog is missing the url',
    author: 'local',
  };

  await api.post('/api/v1/blogs').send(missingUrlBlog).expect(400);
});

describe('testing delete endpoint:', () => {
  test('delete with valid blog', async () => {
    let blogs = await testHelper.getAllBlogsInDB();
    const deleteBlog = blogs[0];

    await api.delete(`/api/v1/blogs/${deleteBlog.id}`).expect(204);

    blogs = await testHelper.getAllBlogsInDB();
    assert.strictEqual(blogs.length, testHelper.initialBlogs.length - 1);

    const titles = blogs.map(b => b.title);
    assert(!titles.includes(deleteBlog.title));
  });

  test('delete with invalid id', async () => {
    const invalidID = '66f6c94ba839eb54b8b0b2dd';
    await api.delete(`/api/v1/blogs/${invalidID}`).expect(404);
  });
});

describe('test update endpoint', () => {
  test('update a valid blog', async () => {
    let blogs = await testHelper.getAllBlogsInDB();
    let updateBlog = blogs[0];
    const newLikesNumber = 999;

    await api
      .patch(`/api/v1/blogs/${updateBlog.id}`)
      .send({
        likes: newLikesNumber,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    blogs = await testHelper.getAllBlogsInDB();
    updateBlog = blogs[0];

    assert.strictEqual(updateBlog.likes, newLikesNumber);
  });
});

// <<==============>>
after(async () => {
  await mongoose.connection.close();
});
