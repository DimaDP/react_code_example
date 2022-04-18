import PropTypes from 'prop-types';
import styles from './OrdersCheckbox.module.scss';

/**
 * @desc Custom checkbox
 * @param {boolean} checked
 * @param {function} setChecked
 */
const OrdersCheckbox = ({ checked, setChecked }) => {
  return (
    <label className={styles.container}>
      <input type='checkbox' checked={checked} onChange={setChecked} />
      <span className={styles.checkmark} />
    </label>
  );
};

OrdersCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
};

export default OrdersCheckbox;
