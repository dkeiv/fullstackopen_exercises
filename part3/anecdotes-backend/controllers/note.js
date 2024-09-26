const noteRouter = require('express').Router();
const Note = require('../models/note');

noteRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

noteRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (err) {
    next(err);
  }
});

noteRouter.get('/:id', async (request, response, next) => {
  // const id = Number(request.params.id);
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(400).end();
    }
  } catch (err) {
    next(err);
  }
});

noteRouter.delete('/:id', async (request, response, next) => {
  // const id = Number(request.params.id);
  try {
    await Note.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (err) {
    next(err);
  }
});

noteRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  try {
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
      new: true,
    });
    response.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

module.exports = noteRouter;
