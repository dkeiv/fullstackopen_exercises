import axios from 'axios';
const baseUrl = '/apihost/api/v1/blogs';

let token = null;
const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async newBlog => {
  const config = { headers: { Authorization: token } };
  console.log(token);
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

export default { getAll, createBlog, setToken };
