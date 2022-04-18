import PropTypes from 'prop-types';
import deleteIcon from '../../assets/images/cancel_24px.svg';
import styles from './DeleteButton.module.scss';

/**
 * @desc Delete button UI
 * @param {function} onPress
 * @param {Object} style - button absolute coords
 * @returns {JSX.Element}
 */

const DeleteButton = ({ onPress, style }) => {
  return (
    <button type='button' onClick={onPress} style={{ ...style }} className={styles.button}>
      <img src={deleteIcon} style={{ width: '16px', height: '16px' }} alt='delete' />
    </button>
  );
};

DeleteButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({
    top: PropTypes.string,
    right: PropTypes.string,
  }).isRequired,
};

export default DeleteButton;
