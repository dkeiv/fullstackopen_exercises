const config = require('./utils/config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const middlewares = require('./utils/middlewares');
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blog');

// <<======================================>>
// conect to mongodb
logger.info('󰌘 Connecting to MongoDB...');
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info(` Connected to ${config.DATABASE_NAME} database!`);
  })
  .catch(err => {
    logger.error(` Error: ${err.message}`);
  });

// <<======================================>>

const app = express();
app.use(express.json());
app.use(cors());
app.use(middlewares.requestLogger);

app.use('/api/v1/blogs', blogRouter);
app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

module.exports = app;
