const PersonForm = ({
  nameValue,
  phoneValue,
  onNameChange,
  onPhoneChange,
  onClickAdd,
}) => {
  return (
    <form>
      <div>
        name: <input value={nameValue} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={phoneValue} onChange={onPhoneChange} />
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
