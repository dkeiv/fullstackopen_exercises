import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';

const createNewNote = () => {
  const dispatch = useDispatch();

  const createNewNote = async e => {
    e.preventDefault();
    const content = e.target.note.value;
    dispatch(createNote({ content, votes: 0 }));
    e.target.note.value = '';
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
