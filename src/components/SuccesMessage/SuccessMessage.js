import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import styles from './SuccessMessage.module.scss';
import { useRootModel } from '../../models/RootModel';
import icon from '../../assets/images/check.svg';

/**
 * @desc Confirmation message after orders passing
 * @returns {JSX.Element}
 */
const SuccessMessage = ({ bottom }) => {
  const {
    orders: { success, setSuccess },
  } = useRootModel();

  useEffect(() => {
    if (success.status) {
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
      setTimeout(() => {
        setSuccess({});
      }, 5000);
    }
  }, []);

  return (
    <div className={styles.container} style={{ bottom }}>
      <img src={icon} className={styles.icon} alt='check' />
      <span className={styles.message}>{success?.message}</span>
    </div>
  );
};

SuccessMessage.propTypes = {
  bottom: PropTypes.number.isRequired,
};

export default observer(SuccessMessage);
