import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';

const createNewNote = () => {
  const dispatch = useDispatch();

  const createNewNote = e => {
    e.preventDefault();
    const anecdote = e.target.note.value;
    e.target.note.value = '';
    dispatch(createNote(anecdote));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewNote}>
        <div>
          <input type='text' name='note' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default createNewNote;
