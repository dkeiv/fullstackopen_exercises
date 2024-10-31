import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../utils/queryies';

const Recommend = () => {
  const { data: meData, loading: meLoading } = useQuery(ME);

  const favoriteGenre = meData?.me?.favoriteGenre;
  const { data: bookData, loading: bookLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
  });

  if (bookLoading || meLoading) return <p>loading...</p>;
  const books = bookData?.allBooks;
  return (
    <div className='mx-2'>
      <h2>recommendations</h2>
      <p>books in your favorite genres patterns</p>

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
              <td>{a?.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Recommend;
