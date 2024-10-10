import { useSelector, useDispatch } from 'react-redux';
import { voteNote } from '../reducers/noteReducer';

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ filter, notes }) =>
    notes.filter(note =>
      note.content.toLowerCase().includes(filter.toLowerCase())
    )
  );

  const vote = id => {
    dispatch(voteNote(id));
  };

  return (
    <>
      {notes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes || 0}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Notes;
