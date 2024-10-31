import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../utils/queryies';
import { useState } from 'react';

const Books = () => {
  const [filter, setFilter] = useState('');
  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  });
  const genreSet = new Set(['all']);

  if (loading) return <p>loading...</p>;

  const books = data?.allBooks;

  books.forEach(book => {
    book.genres.forEach(genreSet.add, genreSet);
  });

  const handleFilter = gen => {
    if (gen === 'all') {
      setFilter('');
      return;
    }
    setFilter(gen);
  };

  return (
    <div className='mx-2'>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            // .filter(b => b.genres.find(g => g.includes(filter)))
            .map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a?.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            {[...genreSet].map((gen, index) => (
              <td key={index}>
                <span onClick={() => handleFilter(gen)}>
                  &nbsp;<span className='underline cursor-pointer'>#{gen}</span>
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Books;
