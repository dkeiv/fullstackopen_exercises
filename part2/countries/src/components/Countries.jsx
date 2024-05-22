const CountryLine = ({ country }) => {
  return (
  <>
    <p>{country.name.common}</p>
    <button>show</button>
  </>
  ) 
};

const CountryDetail = ({ country }) => {
  const countryStyle = {
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
      <p style={countryStyle}>{country.flag}</p>
    </>
  );
};

const Countries = ({ countries }) => {
  if (countries === -1) return <p>Fetching data...</p>;

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (1 < countries.length && countries.length < 10) {
    return (
      <>
        {countries.map((country) => (
          <CountryLine key={country.name.common} country={country} />
        ))}
      </>
    );
  }

  if (countries.length === 1) {
    return (
      <CountryDetail country={countries[0]} />
    );
  }
};

export default Countries;
