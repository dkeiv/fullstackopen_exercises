require('dotenv').config({
  debug: true,
  encoding: 'utf8',
});
const mongoose = require('mongoose');

// prettier-ignore
const db = process.env.TEST_MONGODB_URI
  .replace('<DATABASE_PASSWORD>',process.env.DATABASE_PASSWORD)

mongoose
  .connect(db)
  .then(() => {
    console.log(`Connected to mongodb!`);
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

const note = new Note({
  content: 'What the hell is nextjs :p',
  important: false,
});

note
  .save()
  .then(() => {
    console.log('note saved!');
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    // close the connection and exit the program
    mongoose.connection.close();
  });

// Note.find({})
//   .then(result => {
//     console.log('Note list:');
//     result.forEach(note => {
//       console.log(JSON.stringify(note));
//     });
//   })
//   .catch(err => console.log(err))
//   .finally(() => {
//     mongoose.connection.close();
//   });
