import axios from 'axios';
const HOST = 'http://localhost:3001';

export const fetchAll = () => {
  return axios.get(`${HOST}/anecdotes`).then(res => res.data);
};

export const creatNew = newAnecdote => {
  return axios.post(`${HOST}/anecdotes`, newAnecdote).then(res => res.data);
};

export const updateAnecdote = anecdote => {
  return axios
    .put(`${HOST}/anecdotes/${anecdote.id}`, anecdote)
    .then(res => res.data);
};
