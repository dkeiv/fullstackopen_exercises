import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = ({ addNew }) => {
  const navigate = useNavigate();

  const [content, contentReset] = useField('content');
  const [author, authorReset] = useField('author');
  const [info, infoReset] = useField('info');

  const handleSubmit = e => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate('/');
  };

  const handelReset = () => {
    contentReset();
    authorReset();
    infoReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handelReset}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <input type='reset' value='reset' />
      </form>
    </div>
  );
};

export default CreateNew;
