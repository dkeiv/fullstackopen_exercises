import loginService from '../../services/login';
import useField from '../../hooks/useField';
import {
  clearNoti,
  createNoti,
  useNotificationDispatch,
} from '../../context/slices/notiSlice';

const Login = ({ handleLogin }) => {
  const usernameField = useField('text');
  const passwordField = useField('password');
  const dispatch = useNotificationDispatch();

  const login = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const user = await loginService.login({ username, password });
      handleLogin(user);
    } catch (error) {
      dispatch(
        createNoti({ content: error.response?.data.message, error: true }),
      );
      setTimeout(() => {
        dispatch(clearNoti());
      }, 3000);
    }
  };

  return (
    <div className="m-auto mt-10 max-w-lg rounded-lg border-white bg-stone-100 shadow-md dark:bg-sky-950">
      <h1 className="mx-auto max-w-md py-5 text-center text-lg font-bold dark:text-white">
        login to application
      </h1>
      <form className="mx-auto max-w-md" onSubmit={login}>
        <div className="group relative z-0 mb-5 w-full">
          <input
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-gray-800 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            id="username"
            name="username"
            {...usernameField}
            placeholder=" "
            required
          />
          <label
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-800 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-200 peer-focus:dark:text-gray-400"
            htmlFor="username"
          >
            username
          </label>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <input
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-gray-800 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            id="password"
            name="password"
            {...passwordField}
            placeholder=" "
            required
          />
          <label
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-800 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-200 peer-focus:dark:text-gray-400"
            htmlFor="password"
          >
            password
          </label>
        </div>
        <div className="relative z-0 mb-5 flex flex-col items-center justify-center">
          <button
            className="m-2 items-center rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-semibold text-gray-900 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-200 dark:hover:text-white dark:focus:ring-gray-800"
            type="submit"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
