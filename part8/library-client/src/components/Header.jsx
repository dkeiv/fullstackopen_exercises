import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();
  const titles = [
    {
      label: 'authors',
      url: '/authors',
    },
    {
      label: 'books',
      url: '/books',
    },
    {
      label: 'add book',
      url: '/add',
    },
  ];

  return (
    <nav className='m-2'>
      {titles.map((title, index) => (
        <div
          key={index}
          className={`border border-gray-400 inline-block px-2  ${
            pathname === title.url ? 'bg-slate-600 text-white' : ''
          } `}
        >
          <Link to={title.url}>{title.label}</Link>
        </div>
      ))}
    </nav>
  );
};

export default Header;
