require('dotenv').config({
  debug: true,
  encoding: 'utf8',
});
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
    console.log(err);
  });

// <<========================================================================>>

// schema
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// model
const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//   content: 'Mongoose makes things easy',
//   important: true,
// });

// note
//   .save()
//   .then(result => {
//     console.log('note saved!');
//   })
//   .catch(err => {
//     console.log(err);
//   })
//   .finally(() => {
//     // close the connection and exit the program
//     mongoose.connection.close();
//   });

Note.find({})
  .then(result => {
    result.forEach(note => {
      console.log(note);
    });
  })
  .catch(err => console.log(err))
  .finally(() => {
    mongoose.connection.close();
  });
