import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../utils/queryies';

const AuthorEdit = ({ authors }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [editBirtYear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onCompleted: () => {
      setName('');
      setBorn('');
    },
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (!(name && born)) return;

    const setBornTo = Number(born);
    editBirtYear({ variables: { name, setBornTo } });
  };

  const handleReset = () => {
    setName('');
    setBorn('');
  };

  const onOptionChange = e => {
    const author = authors.find(a => a.name === e.target.value);
    setName(author?.name);
    setBorn(author?.born * 1 || '');
  };

  return (
    <div>
      <h2 className='font-semibold'>Set born</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className='my-1'>
          <label htmlFor='name'>name</label>
          <select
            className='leading-6 border rounded-sm border-slate-400 mx-1 bg-slate-100 '
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={onOptionChange}
          >
            <option key={0} value={''}>
              select
            </option>
            {authors.map((au, index) => (
              <option key={index} value={au.name}>
                {au.name}
              </option>
            ))}
          </select>
        </div>
        <div className='my-1'>
          <label htmlFor='born'>born</label>
          <input
            className='leading-6 border rounded-sm border-slate-400 mx-1'
            id='born'
            type='number'
            name='born'
            value={born}
            onChange={e => setBorn(e.target.value)}
          />
        </div>
        <div>
          <button
            className='px-3 py-1 border rounded border-slate-400 hover:border-slate-800 hover:bg-slate-400 hover:text-white'
            type='submit'
          >
            update
          </button>
          <button
            className='px-3 py-1 border rounded border-slate-400 bg-slate-200 hover:bg-slate-100 hover:border-slate-900 hover:text-slate-800'
            type='reset'
          >
            reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthorEdit;
