const PersonForm = ({
  nameValue,
  numberValue,
  onNameChange,
  onNumberChange,
  onClickAdd,
}) => {
  return (
    <form>
      <div>
        name: <input value={nameValue} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={numberValue} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={onClickAdd}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
