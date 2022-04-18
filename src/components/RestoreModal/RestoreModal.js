import Modal from 'react-modal';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import styles from './RestoreModal.module.scss';
import { useRootModel } from '../../models/RootModel';

/**
 * @desc Modal for restoring orders
 * @param {boolean} isOpen
 * @param {function} toggleModal
 * @param {function} passOrders
 * @param {number} amount
 * @returns {JSX.Element}
 */
const RestoreModal = ({ isOpen, toggleModal, passOrders, amount }) => {
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
      contentLabel='Orders restore dialog'
      className={styles.modal}
      overlayClassName={styles.overlay}
      closeTimeoutMS={500}
    >
      <div className={styles.textBlock}>
        <div className={styles.heading}>Sich Sie sicher?</div>
        <div className={styles.text}>Sind Sie sicher, dass Sie {amount} Aufträge wiederherstellen wollen?</div>
      </div>
      <div className={styles.buttons}>
        <button type='button' onClick={onCancel} className={styles.buttonBack}>
          abbrechen
        </button>
        <button type='button' onClick={onSubmit} className={styles.buttonSubmit}>
          Wiederherstellen
        </button>
      </div>
    </Modal>
  );
};

RestoreModal.propTypes = {
  amount: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  passOrders: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default observer(RestoreModal);
