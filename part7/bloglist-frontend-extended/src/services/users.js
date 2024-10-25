import axios from '../utils/axiosClient';
const baseUrl = '/apihost/api/v1/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUser = async id => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, getUser };
