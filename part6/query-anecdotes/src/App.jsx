import AnecdoteForm from './components/AnecdoteForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAll, updateAnecdote } from './services/anecdotes';
import Notification from './components/Notification';
import {
  clearAction,
  useNotificationDispatch,
  voteAction,
} from './hook/NotificationContext';

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: fetchAll,
    retry: 1,
  });
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const updateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: note => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      dispatch(voteAction(note));
      setTimeout(() => {
        dispatch(clearAction);
      }, 3000);
    },
  });

  const handleVote = anecdote => {
    updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    console.log('vote');
  };

  if (result.isLoading) {
    return <p>loading data... </p>;
  }

  if (result.status === 'error') {
    return <p>{result.error.message} </p>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
