import axios from 'axios';
const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api`;

const getCountry = (countryName) => {
  const request = axios.get(`${baseUrl}/name/${countryName}`);
  return request.then((respone) => respone.data);
};

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((respone) => respone.data);
};

export default {
  getCountry,
  getAllCountries,
};
