const mongoose = require('mongoose');

// prettier-ignore
const db = process.env.DATABASE_URL
  .replace('<DATABASE_PASSWORD>',process.env.DATABASE_PASSWORD)
  .replace('<DATABASE_NAME>', process.env.DATABASE_NAME);

mongoose
  .connect(db)
  .then(() => {
    console.log(`Connected to ${process.env.DATABASE_NAME} database!`);
  })
  .catch(err => {
    console.log(err.message);
  });

// <<========================================================================>>
// schema
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', noteSchema);
