require('dotenv').config({
  debug: true,
  encoding: 'utf8',
});

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI = process.env.MONGODB_URI;
const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

const MONGODB =
  NODE_ENV === 'test'
    ? TEST_MONGODB_URI.replace('<DATABASE_PASSWORD>', DATABASE_PASSWORD)
    : MONGODB_URI.replace('<DATABASE_PASSWORD>', DATABASE_PASSWORD);

// console.log(MONGODB);

module.exports = {
  PORT,
  MONGODB,
};
