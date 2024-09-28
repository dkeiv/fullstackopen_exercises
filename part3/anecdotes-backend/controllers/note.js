const noteRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Note = require('../models/note');
const User = require('../models/user');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

noteRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(notes);
});

noteRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();
  response.status(201).json(savedNote);
});

noteRouter.get('/:id', async (request, response) => {
  // const id = Number(request.params.id);
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

noteRouter.delete('/:id', async (request, response) => {
  // const id = Number(request.params.id);
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
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
