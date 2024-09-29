const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./app_test_helper');
const app = require('../app');

const api = supertest(app);

// <<==============>>
//  initializing data
const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }

  await User.deleteMany({});
});

// <<==============>>

describe('testing public endpoint', () => {
  test('blogs are in json format', async () => {
    await api
      .get('/api/v1/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all two (2) blogs are returned', async () => {
    const res = await api.get('/api/v1/blogs');

    assert.strictEqual(res.body.length, helper.initialBlogs.length);
  });

  test('blogs unique identifier property is named id', async () => {
    const response = await api.get('/api/v1/blogs');

    assert.ok(response.body[0].id);
    assert.strictEqual(response.body[0]._id, undefined);
  });
});

describe('resigter and login', () => {});

describe.only('testing private endpoints', () => {
  describe('unauthorized user', () => {
    test('unauthorized user cannot create a new blog', async () => {
      const newBlog = {
        title: 'New blog to be deleted',
        author: 'local',
        url: 'http://localhost',
        likes: 0,
      };
      await api.post('/api/v1/blogs').send(newBlog).expect(401);
    });

    test('unauthorized user cannot delete a blog', async () => {
      const blogs = await helper.getAllBlogsInDB();
      await api.delete(`/api/v1/blogs/${blogs[0].id}`).expect(401);
    });
  });
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

  const updatedBlogs = await helper.getAllBlogsInDB();

  assert.strictEqual(updatedBlogs.length, helper.initialBlogs.length + 1);

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
    let blogs = await helper.getAllBlogsInDB();
    const deleteBlog = blogs[0];

    await api.delete(`/api/v1/blogs/${deleteBlog.id}`).expect(204);

    blogs = await helper.getAllBlogsInDB();
    assert.strictEqual(blogs.length, helper.initialBlogs.length - 1);

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
    let blogs = await helper.getAllBlogsInDB();
    let updateBlog = blogs[0];
    const newLikesNumber = 999;

    await api
      .patch(`/api/v1/blogs/${updateBlog.id}`)
      .send({
        likes: newLikesNumber,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    blogs = await helper.getAllBlogsInDB();
    updateBlog = blogs[0];

    assert.strictEqual(updateBlog.likes, newLikesNumber);
  });
});

describe('test user endpoints', () => {
  test('create root user', async () => {
    const rootUser = {
      username: 'root',
      password: '123',
      name: 'default user',
    };

    await api
      .post('/api/v1/users')
      .send(rootUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const users = await helper.getAllUserInDB();

    assert.strictEqual(users.length, 1);
    assert.strictEqual(rootUser.username, users[0].username);
    assert.strictEqual(rootUser.name, users[0].name);
  });

  test('create user with username less than 3', async () => {
    const invalidUser = {
      username: 'a',
      password: '123',
      name: 'default user',
    };

    await api.post('/api/v1/users').send(invalidUser).expect(400);
  });

  test('create user with duplicate username', async () => {
    const duplicateUser = {
      username: 'root',
      password: '123',
      name: 'default user',
    };

    await api.post('/api/v1/users').send(duplicateUser).expect(400);
  });

  test('create user with password less than 3', async () => {});
});
// <<==============>>
after(async () => {
  await mongoose.connection.close();
});
