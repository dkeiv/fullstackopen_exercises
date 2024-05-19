import { useState, useEffect } from 'react';
import personService from './services/persons';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then((allPerson) => setPersons(allPerson))
      .catch((err) => console.log(err));
  }, []); // network request

  const handleOnNameChange = (event) => setNewName(event.target.value);
  const handleOnNumberChange = (event) => setNewNumber(event.target.value);
  const handleOnFilterChange = (event) => setNewFilter(event.target.value);

  const nameExist = (name) => persons.find((person) => person.name === name);

  const handleOnClickAdd = (event) => {
    event.preventDefault();
    if (!(newName !== '' && newNumber !== '')) return;

    const confirmMessage = `${newName} is already added to the phonebook, replace the old number with a new one?`;
    if (nameExist(newName)) {
      if (!window.confirm(confirmMessage)) return;
      updateNumber();
    } else {
      addPerson();
    }
  };

  const addPerson = () => {
    const person = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`,
    };

    personService
      .create(person)
      .then((addedPerson) => {
        setNewName('');
        setNewNumber('');
        setPersons(persons.concat(addedPerson)); // trigger re-render
      })
      .catch((err) => console.log(err));
  };

  const updateNumber = () => {
    const person = nameExist(newName);
    const changedPerson = { ...person, number: newNumber };
    personService
      .updateNumber(changedPerson)
      .then((returnedPerson) => {
        setNewName('');
        setNewNumber('');
        setPersons(
          persons.map((p) => (p.id !== returnedPerson.id ? p : returnedPerson))
        ); // trigger re-render
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const byQuery = (query) => (person) => {
    const modifiedQuery = query.toLowerCase().trim();
    return person.name.toLowerCase().includes(modifiedQuery);
  };

  const filteredPersons = persons.filter(byQuery(newFilter));
  // ~ persons.filter(person => person.name.includes(newFilter))

  const handleOnCLickDelete = (deletedPerson) => {
    if (!window.confirm(`Delete user ${deletedPerson.name} ???`)) return;

    personService
      .remove(deletedPerson)
      .then(() => {
        alert(`Deleted ${deletedPerson.name}!`);
        setPersons(persons.filter((person) => person.id !== deletedPerson.id));
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} onFilterChange={handleOnFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        nameValue={newName}
        numberValue={newNumber}
        onNameChange={handleOnNameChange}
        onNumberChange={handleOnNumberChange}
        onClickAdd={handleOnClickAdd}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onClickDelete={handleOnCLickDelete} />
    </div>
  );
};

export default App;
