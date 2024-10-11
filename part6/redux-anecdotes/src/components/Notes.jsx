import { useSelector, useDispatch } from 'react-redux';
import { voteNote } from '../reducers/noteReducer';
import Notification from '../components/Notification';
import { createNoti, removeNoti } from '../reducers/notiReducer';

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ filter, notes }) =>
    notes
      .filter(note => note.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((n1, n2) => n2.votes - n1.votes)
  );

  const noti = useSelector(({ noti }) => noti);

  const vote = note => {
    dispatch(voteNote(note.id));
    dispatch(createNoti(`you voted: ${note.content}`));
    setTimeout(() => dispatch(removeNoti()), 3000);
  };

  return (
    <>
      {noti && <Notification />}

      {notes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes || 0}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Notes;
