import Notes from './components/Notes';
import NewNote from './components/NewNote';
// import VisibilityFilter from './components/VisibilityFilter';
import TextFilter from './components/ContentFilter';

const App = () => {
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
