const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

// <<========================================================================>>
const noteRouter = require('./controllers/note');

logger.info('󰌘 Connecting to MongoDB...');

mongoose
  .connect(config.MONGODB)
  .then(() => {
    logger.info(` Connected to MongoDB!`);
  })
  .catch(err => {
    logger.error(` Error: ${err.message}`);
  });

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/v1/notes', noteRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
