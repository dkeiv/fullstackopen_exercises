import { useParams } from 'react-router-dom';
import userService from '../../services/users';
import { useEffect, useState } from 'react';

const User = () => {
  const { userID } = useParams();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    userService.getUser(userID).then(data => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>loading...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      {user.blogs.length > 0 ? (
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      ) : (
        <p>{user.name} has created no blog</p>
      )}
    </div>
  );
};

export default User;
