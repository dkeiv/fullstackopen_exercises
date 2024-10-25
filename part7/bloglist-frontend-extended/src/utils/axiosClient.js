import Axios from 'axios';

const axios = Axios.create();

axios.interceptors.request.use(
  config => {
    const { token } = JSON.parse(window.localStorage.getItem('login-user'));

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else {
      console.log('no token');
      return;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  res => res,
  error => {
    const data = error.response.data;

    if (data?.message) {
      console.log(data?.message);
    } else if (data?.status) {
      console.log(data?.message);
    }

    return Promise.reject(data);
  }
);

export default axios;
