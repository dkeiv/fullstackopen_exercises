import { useSelector, useDispatch } from 'react-redux';
import { voteNote, selectNotes, fetchAllNote } from '../reducers/noteReducer';
import Notification from '../components/Notification';
import { setNoti } from '../reducers/notiReducer';
import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../reducers/filterReducer';

const Notes = () => {
  const dispatch = useDispatch();

  const getNotes = createSelector(
    [selectNotes, selectFilter],
    (notes, filter) =>
      notes.data
        .filter(note =>
          note.content.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((n1, n2) => n2.votes - n1.votes)
  );

  const notes = useSelector(getNotes);

  const noti = useSelector(({ noti }) => noti);

  const vote = note => {
    dispatch(voteNote(note));
    dispatch(setNoti(`you voted: ${note.content}`, 3));
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
