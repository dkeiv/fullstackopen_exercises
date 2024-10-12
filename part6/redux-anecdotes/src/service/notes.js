import axios from 'axios';
const HOST = 'http://localhost:3001';

const fetchAllNotes = async () => {
  const response = await axios.get(`${HOST}/notes`);
  return response.data;
};

const createNote = async newNote => {
  const response = await axios.post(`${HOST}/notes`, { ...newNote });
  return response.data;
};

const voteNote = async note => {
  const { id } = note;
  const response = await axios.put(`${HOST}/notes/${id}`, {
    ...note,
    votes: note.votes + 1,
  });

  return response.data;
};

export default { fetchAllNotes, createNote, voteNote };
