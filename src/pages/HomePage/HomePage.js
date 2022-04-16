import { useState } from 'react';
import { signup, login } from '../../service/auth/index.js';
import s from './HomePage.module.scss';

const HomePage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupUser = async () => {
    await signup({ email, password });
  };

  const loginUser = async () => {
    await login({ email, password }).then(data => {
      if (data) {
        setEmail('');
        setPassword('');
        setIsLoggedIn(true);
      }
    });
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  const onChange = e => {
    switch (e.currentTarget.id) {
      case 'email':
        setEmail(e.target.value);
        break;

      case 'password':
        setPassword(e.target.value);
        break;

      default:
        break;
    }
  };

  return (
    <div className={s.home_page}>
      <div className={s.box}>
        <p>Registrattion / login from</p>
        <form onSubmit={onSubmit} className={s.form}>
          <div className={s.flex}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={email} onChange={onChange} />
          </div>
          <div className={s.flex}>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" value={password} onChange={onChange} />
          </div>
        </form>
        <div className={s.btn_group}>
          <button onClick={signupUser} className={s.btn}>
            SIGNUP
          </button>
          <button onClick={loginUser} className={s.btn}>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
