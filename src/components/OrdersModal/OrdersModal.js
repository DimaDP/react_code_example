import Modal from 'react-modal';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import styles from './OrdersModal.module.scss';
import { useRootModel } from '../../models/RootModel';

/**
 * @desc Orders passing confirmation modal
 * @param {boolean} isOpen
 * @param {function} toggleModal
 * @param {function} passOrders - function for pass orders to server
 * @param {boolean} temporary
 * @param {Object} user
 * @param {number} amount - amount of orders to pass
 * @returns {JSX.Element}
 */
const OrdersModal = ({ isOpen, toggleModal, passOrders, temporary, user, amount }) => {
  const {
    orders: { setSelectedOrders, getOrders },
  } = useRootModel();

  const onCancel = () => {
    toggleModal();
  };
  const onSubmit = async () => {
    await passOrders();
    setSelectedOrders([]);
    await getOrders(0);
    toggleModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onCancel}
      contentLabel='Orders passing dialog'
      className={styles.modal}
      overlayClassName={styles.overlay}
      closeTimeoutMS={50}
    >
      <div className={styles.textBlock}>
        <div className={styles.heading}>Warnung!</div>
        <div className={styles.text}>
          Sind Sie sicher, dass Sie{' '}
          <span className={styles.outlined}>
            {temporary ? 'vorübergehend' : ''} {amount}
          </span>{' '}
          Aufträge an <span className={styles.outlined}>{user?.name}</span> weitergeben wollen?
        </div>
      </div>
      <div className={styles.buttons}>
        <button type='button' onClick={onCancel} className={styles.buttonBack}>
          abbrechen
        </button>
        <button type='button' onClick={onSubmit} className={styles.buttonSubmit}>
          Aufträge weitergeben
        </button>
      </div>
    </Modal>
  );
};

OrdersModal.propTypes = {
  amount: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  passOrders: PropTypes.func.isRequired,
  temporary: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default observer(OrdersModal);
