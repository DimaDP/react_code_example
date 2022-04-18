import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './PassOrderForm.module.scss';
import { useRootModel } from '../../../models/RootModel';
import icon from '../../../assets/images/arrow-circle-right.svg';
import AutoCompleter from '../../Autocomplete/Autocompleter';
import OrdersModal from '../../OrdersModal/OrdersModal';
import RestoreModal from '../../RestoreModal/RestoreModal';
import PassFormCloseButton from '../../PassFormCloseButton/PassFormCloseButton';

/**
 * @desc Form for passing order options
 * @param {boolean} isOpen
 * @returns {JSX.Element}
 */
const PassOrderForm = ({ isOpen }) => {
  const [isTemporary, setIsTemporary] = useState(true);
  const [value, onChange] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {
    users: { selectedUser },
    orders: {
      getUsers,
      selectedOrders,
      passOrders,
      passOrdersForAll,
      isCheckedAll,
      page,
      excludedOrders,
      isActiveReverseModal,
      toggleReverseModal,
      restoreOrdersForAll,
      restoreOrders,
      setActivePassOrderMenu,
    },
  } = useRootModel();
  useEffect(() => {
    getUsers(0);
  }, []);

  useEffect(() => {
    onChange(null);
    setIsTemporary(true);
  }, [isOpen]);

  const onSubmit = async () => {
    const params = {
      fromUserId: selectedUser.id,
      toUserId: value.id,
      temporary: isTemporary,
    };
    if (!isCheckedAll) {
      await passOrders(params);
    } else {
      await passOrdersForAll(params);
    }
  };

  const onReverseOrders = async () => {
    const params = {
      toUserId: selectedUser.id,
    };
    if (!isCheckedAll) {
      await restoreOrders(params);
    } else {
      await restoreOrdersForAll(params);
    }
  };

  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const closeForm = () => {
    setActivePassOrderMenu(false);
  };

  const isDisabledSubmit = !value;
  const totalAmount = isCheckedAll ? page.totalElements - excludedOrders.length : selectedOrders.length;

  return (
    <>
      {isOpen && (
        <OrdersModal
          isOpen={isOpenModal}
          toggleModal={handleModal}
          amount={totalAmount}
          passOrders={onSubmit}
          temporary={isTemporary}
          user={selectedUser}
        />
      )}
      {isActiveReverseModal && (
        <RestoreModal
          isOpen={isActiveReverseModal}
          toggleModal={toggleReverseModal}
          amount={totalAmount}
          passOrders={onReverseOrders}
          temporary={isTemporary}
          user={value}
        />
      )}
      <div
        className={styles.container}
        style={{
          maxHeight: isOpen ? '360px' : 0,
          minHeight: isOpen ? '360px' : 0,
          overflowY: isOpen ? 'visible' : 'hidden',
        }}
      >
        <div className={styles.confirmation}>
          <span className={styles.header}>Weitergabe von Aufträgen</span>
          <button type='button' className={styles.button} onClick={handleModal} disabled={isDisabledSubmit}>
            <img src={icon} alt='confirm' className={styles.icon} />
            Aufträge weitergeben
          </button>
        </div>
        <div className={styles.form}>
          <PassFormCloseButton style={{ top: '30px', right: '100px' }} onPress={closeForm} />
          <div className={styles.topics}>
            <div className={styles.headings}>Anzahl der Aufträge</div>
            <div className={styles.text}>{totalAmount}</div>
            <div className={styles.headings} style={{ marginTop: '40px' }}>
              Eigentümer
            </div>
            <div className={styles.text}>{selectedUser.name}</div>
          </div>
          <div className={styles.divider} />
          <div className={styles.topics}>
            <div className={styles.headings} style={{ marginBottom: '20px' }}>
              Weitergeben an (auswählen)
            </div>
            <AutoCompleter value={value} onChange={onChange} />
          </div>
          <div className={styles.topics} style={{ flex: 2 }}>
            <div className={styles.headings}>Art der Weitergabe (auswählen)</div>
            <label className={styles.radio}>
              Temporär
              <input type='radio' checked={isTemporary} name='temporary' onChange={() => setIsTemporary(true)} />
              <span className={styles.checkmark} />
            </label>
            <label className={styles.radio}>
              Dauerhaft
              <input type='radio' name='permanently' checked={!isTemporary} onChange={() => setIsTemporary(false)} />
              <span className={styles.checkmark} />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

PassOrderForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default observer(PassOrderForm);
