import axios from 'axios';
const baseUrl = '/apihost/api/v1/blogs';

let token = null;
let config = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
  config = { headers: { Authorization: token } };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateBlog = async updatedBlog => {
  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    {
      user: updatedBlog.user.id,
      likes: updatedBlog.likes,
      author: updatedBlog.author,
      title: updatedBlog.title,
      url: updatedBlog.url,
    },
    config
  );
  return response.data;
};

const removeBlog = id => {
  return axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, createBlog, setToken, updateBlog, removeBlog };
