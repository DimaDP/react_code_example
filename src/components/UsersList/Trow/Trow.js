import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Trow.module.scss';
import linkIcon from '../../../assets/images/ink-alt.svg';
import phoneParser from '../../../utils/phoneParaser';

/**
 * @desc Trow for Users Table
 * @param {Object} user
 * @param {function} selectUser
 * @returns {JSX.Element}
 */
const Trow = ({ user, selectUser }) => {
  const { phone, name, companies } = user;

  return (
    <tr className={styles.container}>
      <td className={styles.td}>
        <div style={{ paddingLeft: '100px' }}>
          <span>{companies.join(', ')}</span>
        </div>
      </td>
      <td className={styles.td}>
        <div>
          <span>{name}</span>
        </div>
      </td>
      <td className={styles.td}>
        <div>
          <span>{phoneParser(phone)}</span>
        </div>
      </td>
      <td className={styles.td}>
        <div className={styles.center}>
          <Link
            className={styles.link}
            to='/orders'
            onClick={() => {
              selectUser(user);
            }}
          >
            <img alt='order' src={linkIcon} width='16' height='16' />
          </Link>
        </div>
      </td>
    </tr>
  );
};

Trow.propTypes = {
  user: PropTypes.shape({
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    companies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  selectUser: PropTypes.func.isRequired,
};

export default Trow;
