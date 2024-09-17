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

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 2) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} number ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 4) {
  const name = process.argv[2];
  const number = process.argv[3];
  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    console.log(`add ${person.name} number ${person.number} to person! 👌`);
    mongoose.connection.close();
  });
} else {
  console.log('Something went wrong! 💥');
}
