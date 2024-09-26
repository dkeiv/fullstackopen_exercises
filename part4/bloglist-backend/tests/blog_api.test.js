const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const testHelper = require('./blog_test_helper');
const app = require('../app');

const api = supertest(app);

// <<==============>>
//  initializing data
const Blog = require('../models/blog');
const { title } = require('node:process');
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

test.only('missing title property, returns 400', async () => {
  const missingTitleBlog = {
    author: 'local',
    url: 'http://localhost',
  };

  await api.post('/api/v1/blogs').send(missingTitleBlog).expect(400);
});

test.only('missing url property, returns 400', async () => {
  const missingUrlBlog = {
    title: 'This blog is missing the url',
    author: 'local',
  };

  await api.post('/api/v1/blogs').send(missingUrlBlog).expect(400);
});

// <<==============>>
after(async () => {
  await mongoose.connection.close();
});
