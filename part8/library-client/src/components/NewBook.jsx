import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_BOOK, ALL_BOOKS } from '../utils/queryies';

const NewBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
  });

  const submit = async event => {
    event.preventDefault();

    console.log('add book...');

    const publishedInt = Number(published);

    createBook({
      variables: { title, author, published: publishedInt, genres },
    });

    setTitle('');
    setAuthor('');
    setPublished('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div className='mx-2'>
      <form onSubmit={submit}>
        <div className='m-2 ml-0'>
          title
          <input
            className='border rounded border-gray-800 leading-6 pl-1 ml-2'
            value={title}
            placeholder='The Ring'
            required
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className='m-2 ml-0'>
          author
          <input
            className='border rounded border-gray-800 leading-6 pl-1 ml-2'
            value={author}
            placeholder='Mark Tawin'
            required
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className='m-2 ml-0'>
          published
          <input
            className='border rounded border-gray-800 leading-6 pl-1 ml-2'
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div className='m-2 ml-0'>
          <input
            className='border rounded border-gray-800 leading-6 pl-1 '
            value={genre}
            placeholder='refactor'
            onChange={({ target }) => setGenre(target.value)}
          />
          <button
            className='ml-2 px-3 border border-gray-400 rounded hover:bg-slate-400 hover:text-white hover:border-gray-700'
            onClick={addGenre}
            type='button'
          >
            add genre
          </button>
        </div>
        <div className='m-2 ml-0'>
          genres:
          {genres.map(g => (
            <span key={g}>
              &nbsp;<span className='underline cursor-pointer'>#{g}</span>
            </span>
          ))}
        </div>
        <button
          type='submit'
          className='px-3 border border-gray-400 rounded hover:bg-slate-400 hover:text-white hover:border-gray-700'
        >
          create book
        </button>
      </form>
    </div>
  );
};

export default NewBook;
