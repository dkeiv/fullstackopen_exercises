require('dotenv').config({ debug: true, encoding: 'utf8' });

const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

// prettier-ignore
const MONGODB_URI = DATABASE_URL
  .replace('<DATABASE_PASSWORD>', DATABASE_PASSWORD)
  .replace('<DATABASE_NAME>', DATABASE_NAME);

module.exports = {
  PORT,
  DATABASE_NAME,
  MONGODB_URI,
};
