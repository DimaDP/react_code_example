import PropTypes from 'prop-types';
import styles from './Checkbox.module.scss';

/**
 * @desc Custom checkbox UI
 * @param {boolean} checked
 * @param {function} setChecked
 * @returns {JSX.Element}
 */
const Checkbox = ({ checked, setChecked }) => {
  return (
    <label className={styles.container}>
      Logindaten merken
      <input type='checkbox' checked={checked} onChange={setChecked} />
      <span className={styles.checkmark} />
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
};

export default Checkbox;
