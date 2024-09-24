const { test, after, beforeEach } = require('node:test');
const Note = require('../models/note');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

// <<=================================>>
const initialNotes = [
  { content: 'HTML is easy', important: false },
  { content: 'Browser can execute only JavaScript', important: true },
];

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});
// <<============================>>

test.only('notes are returned as json', async () => {
  await api
    .get('/api/v1/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});

// <<==============================>>

test.only('there are two (2) notes', async () => {
  const response = await api.get('/api/v1/notes');

  assert.strictEqual(response.body.length, initialNotes.length);
});

test.only('the first note is about HTML', async () => {
  const response = await api.get('/api/v1/notes');

  const contents = response.body.map(e => e.content);
  assert.strictEqual(contents.includes('HTML is easy'), true);
});
