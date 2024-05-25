const express = require('express');
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get('/', (request, response) => {
  response.send(
    `<h1>Hi there!!!</h1>
        <ul>
            <li>
                <a href="http://localhost:3001/api/persons">/api/persons</a>
            </li>
        </ul>
    `
  );
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  let data = `<p>Phonebook has info for ${persons.length} people.<p>`;
  data += `<p>${new Date()}</p>`;
  response.send(data);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.send(person);
  } else {
    response.statusMessage = `Person doesn't exists.`;
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id === id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!body) {
    return response.status(400).json({ error: 'content missing' });
  }
  const person = {
    id: generateId(),
    ...body,
  };
  console.log(person);
  
  if(!person.name || !person.number) {
    return response.status(400).json({ error: 'missing name and/or number' });
  }

  if(persons.filter(p => p.name === person.name)) {
    return response.status(400).json({ error: 'name must be unique' });
  }

  persons = persons.concat(person);
  response.send(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server is running at http://localhost:${PORT} ...`);
