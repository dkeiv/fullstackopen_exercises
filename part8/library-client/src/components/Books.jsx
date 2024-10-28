import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../utils/queryies';

const Books = () => {
  const { data, loading } = useQuery(ALL_BOOKS);

  if (loading) return <p>loading...</p>;

  const books = data.allBooks;

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
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
