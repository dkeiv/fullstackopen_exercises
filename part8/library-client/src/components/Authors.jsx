import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../utils/queryies';
import AuthorEdit from './AuthorEdit';

const Authors = () => {
  const { data, loading } = useQuery(ALL_AUTHORS);

  if (loading) {
    return <p>loading...</p>;
  }

  const authors = data.allAuthors;

  return (
    <div className='mx-2'>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>author</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorEdit authors={authors} />
    </div>
  );
};

export default Authors;
