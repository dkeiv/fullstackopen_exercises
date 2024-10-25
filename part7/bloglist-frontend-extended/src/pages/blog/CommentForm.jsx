import useField from '../../hooks/useField';

const CommentForm = ({ handleAddComment }) => {
  const comment = useField('text');
  const handleSubmit = e => {
    e.preventDefault();
    const content = e.target.comment.value;
    handleAddComment({ content });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input {...comment} name='comment' />
      <button type='submit'>add comment</button>
    </form>
  );
};

export default CommentForm;
