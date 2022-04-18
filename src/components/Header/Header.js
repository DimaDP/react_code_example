import { Link, useHistory, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import exitIcon from '../../assets/images/sign-out-alt.svg';
import { clearStore, useRootModel } from '../../models/RootModel';
import logoIcon from '../../assets/images/logo_sm.svg';

/**
 * @desc Header UI
 * @returns {JSX.Element}
 */
const Header = () => {
  const {
    auth: { setIsAuthenticated },
    orders: { clearData },
  } = useRootModel();

  const history = useHistory();

  const handleClick = () => {
    clearData();
    history.push('/users');
  };

  const location = useLocation();

  const isVisible = location.pathname !== '/login';

  const clearAuth = () => {
    localStorage.removeItem('TOKEN');
    sessionStorage.removeItem('TOKEN');
    clearStore();
    setIsAuthenticated(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_title}>
        <Link className={styles.header_title} to='/users' onClick={handleClick}>
          <img src={logoIcon} alt='BMS logo' />
        </Link>
      </div>
      {isVisible && (
        <div role='presentation' className={styles.header_exit} onClick={clearAuth}>
          <img src={exitIcon} alt='Exit' className={styles.header_icon} />
          Ausloggen
        </div>
      )}
    </header>
  );
};

export default Header;
