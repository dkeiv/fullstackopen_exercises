import { useParams } from 'react-router-dom';

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdote = anecdotes.find(n => n.id === Number(id));
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>has {anecdote.votes}</div>
      <div>for more info see: {anecdote.info}</div>
    </div>
  );
};

export default Anecdote;
