import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './UserNavigator.module.scss';
import homeIcon from '../../assets/images/external-link-square-alt.svg';
import rightIcon from '../../assets/images/right.svg';
import { useRootModel } from '../../models/RootModel';

/**
 * @desc Breadcrumbs for current user
 * @param {Object} user
 * @returns {JSX.Element}
 */
const UserNavigator = ({ user }) => {
  const {
    orders: { isActivePassOrderMenu, clearData },
  } = useRootModel();

  const history = useHistory();

  const handleClick = () => {
    clearData();
    history.push('/users');
  };
  return (
    <div className={styles.container}>
      <Link to='/' className={styles.link} onClick={handleClick}>
        <img role='presentation' src={homeIcon} className={styles.iconHome} alt='home' />
      </Link>
      <img src={rightIcon} className={styles.rightIcon} alt='right' />
      <span>{user.name} (Aufträge)</span>
      {isActivePassOrderMenu && (
        <>
          <img src={rightIcon} className={styles.rightIcon} alt='right' />
          <span>Weitergabe von Aufträgen</span>
        </>
      )}
    </div>
  );
};

UserNavigator.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default UserNavigator;
