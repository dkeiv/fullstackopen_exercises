import useField from '../../hooks/useField';

const CommentForm = ({ handleAddComment }) => {
  const comment = useField('text');
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.comment.value;
    handleAddComment({ content });
  };
  return (
    <form className='mx-auto my-2 w-[80%]' onSubmit={handleSubmit}>
      <input
        placeholder='write a comment...'
        {...comment}
        name='comment'
        className='mx-auto h-6 rounded text-center'
      />
      {/* <button type='submit'>add comment</button> */}
    </form>
  );
};

export default CommentForm;
