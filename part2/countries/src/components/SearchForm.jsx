const SearchForm = ({ query, handleOnChange }) => {
  return (
    <>
      <label htmlFor="searchCountry">
        find countries:
        <input
          type="text"
          name="searchCountry"
          id="searchCountry"
          value={query}
          onChange={handleOnChange}
        />
      </label>
    </>
  );
};

export default SearchForm;
