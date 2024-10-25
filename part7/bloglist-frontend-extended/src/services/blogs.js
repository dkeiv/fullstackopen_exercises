import axios from '../utils/axiosClient';
const baseUrl = '/apihost/api/v1/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async newBlog => {
  const response = await axios.post(baseUrl, newBlog);
  return response.data;
};

const updateBlog = async updatedBlog => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, {
    user: updatedBlog.user.id,
    likes: updatedBlog.likes,
    author: updatedBlog.author,
    title: updatedBlog.title,
    url: updatedBlog.url,
  });
  return response.data;
};

const removeBlog = id => {
  return axios.delete(`${baseUrl}/${id}`);
};

const getBlog = async id => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const addComment = async (id, content) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    ...content,
  });
  return response.data;
};

export default {
  getAll,
  createBlog,
  updateBlog,
  removeBlog,
  getBlog,
  addComment,
};
