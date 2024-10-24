import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { creatNew } from '../services/anecdotes';
import {
  useNotificationDispatch,
  createAction,
  clearAction,
  errorAction,
} from '../hook/NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const createNewMutation = useMutation({
    mutationFn: creatNew,
    onSuccess: note => {
      console.log(note);
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      dispatch(createAction(note));
      setTimeout(() => {
        dispatch(clearAction);
      }, 3000);
    },
    onError: error => {
      let message = 'unknown error';
      message = error.response?.data.error;
      dispatch(errorAction(message));
      setTimeout(() => {
        dispatch(clearAction);
      }, 3000);
    },
  });

  const onCreate = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    createNewMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
