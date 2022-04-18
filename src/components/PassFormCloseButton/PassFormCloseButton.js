import PropTypes from 'prop-types';
import styles from './PassFormCloseButton.module.scss';

/**
 * @desc Button for closing pass form
 * @param {function} onPress
 * @param {Object} style
 * @returns {JSX.Element}
 */
const PassFormCloseButton = ({ onPress, style }) => {
  return (
    <button type='button' onClick={onPress} style={{ ...style }} className={styles.button} aria-label='close form' />
  );
};

PassFormCloseButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({
    top: PropTypes.string,
    right: PropTypes.string,
  }).isRequired,
};

export default PassFormCloseButton;
