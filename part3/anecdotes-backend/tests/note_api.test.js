const { test, after, beforeEach } = require('node:test');
const Note = require('../models/note');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const TestHelper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

// <<=================================>>

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(TestHelper.initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(TestHelper.initialNotes[1]);
  await noteObject.save();
});
// <<============================>>

test('notes are returned as json', async () => {
  await api
    .get('/api/v1/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});

// <<==============================>>

test('there are two (2) notes', async () => {
  const response = await api.get('/api/v1/notes');

  assert.strictEqual(response.body.length, TestHelper.initialNotes.length);
});

test('the first note is about HTML', async () => {
  const response = await api.get('/api/v1/notes');

  const contents = response.body.map(e => e.content);
  assert.strictEqual(contents.includes('HTML is easy'), true);
});

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/v1/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const notesAtEnd = await TestHelper.notesInDb();

  assert.strictEqual(notesAtEnd.length, TestHelper.initialNotes.length + 1);

  const contents = notesAtEnd.map(note => note.content);
  assert(contents.includes('async/await simplifies making async calls'));
});

test.only('note without content is not added', async () => {
  const newNote = {
    important: true,
  };

  await api.post('/api/v1/notes').send(newNote).expect(400);

  const notesAtEnd = await TestHelper.notesInDb();
  assert.strictEqual(notesAtEnd.length, TestHelper.initialNotes.length);

  after(async () => {
    await mongoose.connection.close();
  });
});
