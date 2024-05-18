import { useState, useEffect } from 'react';
import axios from 'axios';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    const url = 'http://localhost:3001/persons';

    axios
      .get(url)
      .then((respone) => setPersons(respone.data))
      .catch((err) => console.log(err));
  },[]);

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
