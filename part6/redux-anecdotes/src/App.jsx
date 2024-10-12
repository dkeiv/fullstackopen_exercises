import Notes from './components/Notes';
import NewNote from './components/NewNote';
import TextFilter from './components/ContentFilter';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllNote } from './reducers/noteReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllNote());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <NewNote />
      {/* <VisibilityFilter /> */}
      <TextFilter />
      <Notes />
    </div>
  );
};

export default App;
