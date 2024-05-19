const Person = ({ person, onClickDelete }) => {
  return (
    <>
      <p>
        {person.name} {person.number}
        <button onClick={onClickDelete}> delete </button>
      </p>
    </>
  );
};

const Persons = ({ persons, onClickDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.id} person={person} onClickDelete={() => onClickDelete(person)} />
      ))}
    </>
  );
};

export default Persons;
