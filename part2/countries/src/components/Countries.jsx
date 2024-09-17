const CountryDetail = ({ country }) => {
  const countryFlag = {
    fontSize: 200,
    margin: 0,
  };

  return (
    <>
      <h1>{country.name.official}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <p style={countryFlag}>{country.flag}</p>
    </>
  );
};

const CountryLine = ({ country }) => {
  return (
    <div>
      <span>{country.name.common}</span>
      <button>show</button>
    </div>
  );
};

const Countries = ({ countries }) => {
  if (!countries) return <p>Fetching data...</p>; // fetching data: countries = null

  if (countries.length === 1) return <CountryDetail country={countries[0]} />;

  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  if (1 < countries.length && countries.length < 10) {
    return (
      <>
        {countries.map((country) => (
          <CountryLine key={country.name.common} country={country} />
        ))}
      </>
    );
  }
};

export default Countries;
