import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((respone) => respone.data);
};

const create = (newPersonObject) => {
  const request = axios.post(baseURL, newPersonObject);
  return request.then((respone) => respone.data);
};

const remove = (person) => {
  const request = axios.delete(`${baseURL}/${person.id}`);
  return request.then((respone) => respone.data);
};

const updateNumber = (person) => {
  const request = axios.put(`${baseURL}/${person.id}`, person);
  return request.then((respone) => respone.data);
};

export default {
  getAll,
  create,
  updateNumber,
  remove,
};
