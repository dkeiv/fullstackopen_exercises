import { useState } from 'react';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const handleOnNameChange = (event) => setNewName(event.target.value);
  const handleOnPhoneChange = (event) => setNewPhone(event.target.value);
  const handleOnFilterChange = (event) => setNewFilter(event.target.value);

  const personExist = () => persons.find((person) => person.name === newName);

  const handleOnClickAdd = (event) => {
    event.preventDefault();
    personExist()
      ? alert(`${newName} is already added to phonebook`)
      : addPerson();
  };

  const addPerson = () => {
    const person = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    };
    setPersons(persons.concat(person));
  };

  const byQuery = (query) => (person) => {
    const modifiedQuery = query.toLowerCase().trim();
    return person.name.toLowerCase().includes(modifiedQuery);
  };

  const filteredPersons = persons.filter(byQuery(newFilter));
  // ~ persons.filter(person => person.name.includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} onFilterChange={handleOnFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        nameValue={newName}
        phoneValue={newPhone}
        onNameChange={handleOnNameChange}
        onPhoneChange={handleOnPhoneChange}
        onClickAdd={handleOnClickAdd}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
