import { NavLink } from 'react-router-dom';
import { logout } from '../../service/auth/index.js';
import s from './Header.module.scss';
const Header = ({ setIsLoggedIn }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('user'));
  const logoutUser = () => {
    logout().then(() => setIsLoggedIn(false));
  };
  return (
    <div className={s.header}>
      <div className={s.content}>
        <p className={s.logo}>Mortgage Calculator</p>
        {isLoggedIn ? (
          <>
            <ul className={s.list}>
              <li className={s.list_item}>
                <NavLink
                  to="/banks"
                  alt="banks page"
                  className={s.link}
                  activeClassName={s.active_link}
                >
                  Banks
                </NavLink>
              </li>
              <li className={s.list_item}>
                <NavLink
                  to="/calculator"
                  alt="calculator page"
                  className={s.link}
                  activeClassName={s.active_link}
                >
                  Calculator
                </NavLink>
              </li>
            </ul>
            <button className={s.btn} onClick={logoutUser}>
              Logout
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Header;
