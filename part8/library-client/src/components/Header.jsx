import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../utils/userContext';

const Header = ({ handleLogout }) => {
  const { pathname } = useLocation();
  const { user } = useContext(UserContext);

  const titles = [
    {
      label: 'authors',
      url: '/authors',
      display: true,
    },
    {
      label: 'books',
      url: '/books',
      display: true,
    },
    {
      label: 'add book',
      url: '/add',
      display: user ? true : false,
    },
    {
      label: 'recommend',
      url: '/recommend',
      display: user ? true : false,
    },
    {
      label: 'login',
      url: '/login',
      display: user ? false : true,
    },
    {
      label: 'logout',
      url: '/',
      display: user ? true : false,
      handleOnClick: handleLogout,
    },
  ];

  return (
    <nav className='m-2'>
      {titles.map((title, index) => {
        if (title.display) {
          return (
            <div
              key={index}
              className={`border border-gray-400 inline-block px-2  ${
                pathname === title.url ? 'bg-slate-600 text-white' : ''
              } `}
              onClick={title.handleOnClick}
            >
              <Link to={title.url}>{title.label}</Link>
            </div>
          );
        }
      })}
    </nav>
  );
};

export default Header;
