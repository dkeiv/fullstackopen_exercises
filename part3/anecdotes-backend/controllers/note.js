const noteRouter = require('express').Router();
const Note = require('../models/note');

noteRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  });
});

noteRouter.post('/', (request, response) => {
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

  note.save().then(savedNote => {
    response.json(savedNote);
  });
});

noteRouter.get('/:id', (request, response) => {
  const id = Number(request.params.id);
  Note.findById(id).then(note => {
    response.json(note);
  });
});

noteRouter.delete('/:id', (request, response) => {
  const id = Number(request.params.id);
  Note.findByIdAndDelete(id).then(() => {
    response.status(204).end();
  });
});

noteRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote);
    })
    .catch(error => next(error));
});

module.exports = noteRouter;
