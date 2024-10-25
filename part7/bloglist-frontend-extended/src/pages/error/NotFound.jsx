import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <p>Page note found</p>
      <Link to={'/'}>back to home</Link>
    </div>
  );
};

export default NotFound;
