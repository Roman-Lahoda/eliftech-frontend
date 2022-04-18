import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL =
  // process.env.NODE_ENV === 'development'
  //   ? 'http://localhost:4000'
  //   :
  'https://eliftech-calculator.herokuapp.com/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const signup = async userData => {
  try {
    const { data } = await axios.post('/auth/signup', userData);
    toast.success('Registered successfully');
    return data;
  } catch (err) {
    toast.error('An error occurred, please try again later or try another email', {
      autoClose: 5000,
    });
  }
};

const login = async userData => {
  try {
    const { data } = await axios.post('/auth/login', userData);
    token.set(data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data));
    toast.success(`Welcome ${data.data.email}`);
    return data.data;
  } catch (err) {
    toast.error('An error occurred, please try again later');
  }
};

const logout = async () => {
  try {
    const { data } = await axios.post('/auth/logout');
    token.unset();
    // localStorage.removeItem('user');
    // localStorage.removeItem('banks');
    // toast.success('Goodbuy');
    return data.data;
  } catch (err) {
    // toast.error('An error occurred, please try again later');
  }
};

const refresh = async () => {
  try {
    const tokenUser = JSON.parse(localStorage.getItem('user'))?.token;
    if (tokenUser) {
      token.set(tokenUser);
    }
  } catch (err) {
    toast.error('An error occurred, please login again');
  }
};

export { signup, login, logout, refresh };
