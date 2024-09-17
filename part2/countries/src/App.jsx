import { useState, useEffect } from 'react';
import countryService from './services/countries';
import SearchForm from './components/SearchForm';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    countryService
      .getAllCountries()
      .then((countries) => {
        setCountries(countries);
        console.log(`fetched all countries...`);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleOnChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const byQuery = (query) => (country) => {
    const modifiedQuery = query.toLowerCase().trim();
    return country.name.common.toLowerCase().includes(modifiedQuery);
  };

  const filteredCountries = countries ? countries.filter(byQuery(query)) : countries;

  return (
    <>
      <div>
        <SearchForm query={query} handleOnChange={handleOnChange} />
        <Countries countries={filteredCountries} />
        {/* {console.log(import.meta.env.VITE_SOMEKEY)} */}
      </div>
    </>
  );
};

export default App;
