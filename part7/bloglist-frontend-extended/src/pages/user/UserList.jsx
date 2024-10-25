import { useQuery } from '@tanstack/react-query';
import userService from '../../services/users';
import { Link } from 'react-router-dom';

const UserList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>loading...</p>;

  const users = data;

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((b1, b2) => b2.likes - b1.likes)
            .map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
