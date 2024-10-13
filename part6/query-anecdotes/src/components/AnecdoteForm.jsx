import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { creatNew } from '../services/anecdotes';
import { useState } from 'react';
import Notification from '../components/Notification';

const AnecdoteForm = () => {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const createNewMutation = useMutation({
    mutationFn: creatNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
    onError: error => {
      setMessage(error.response.data.error);
      setTimeout(() => {
        setMessage('');
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
      <Notification message={message} />

      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
