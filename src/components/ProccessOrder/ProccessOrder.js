import { observer } from 'mobx-react-lite';
import styles from './ProccessOrder.module.scss';
import icon from '../../assets/images/arrow-circle-right.svg';
import undo from '../../assets/images/undo-alt.svg';
import { useRootModel } from '../../models/RootModel';

/**
 * @desc Changing order process type depending on type
 * @returns {JSX.Element}
 */
const ProcessOrder = () => {
  const {
    orders: {
      isActivePassOrderMenu,
      setActivePassOrderMenu,
      selectedOrders,
      isCheckedAll,
      excludedOrders,
      page,
      ordersType,
      toggleReverseModal,
    },
  } = useRootModel();

  const totalAmount = isCheckedAll ? page.totalElements - excludedOrders.length : selectedOrders.length;
  const isPassed = ordersType === 'PASSED';

  const isActiveButton = totalAmount > 0;
  return (
    <div className={styles.container}>
      {!isActivePassOrderMenu && !isPassed && (
        <button
          type='button'
          className={styles.button}
          disabled={!isActiveButton}
          onClick={() => setActivePassOrderMenu(!isActivePassOrderMenu)}
        >
          <img src={icon} alt='confirm' className={styles.icon} />
          Weitergabe von Aufträgen an {isActiveButton && `(${totalAmount})`}
        </button>
      )}
      {isPassed && (
        <button type='button' className={styles.button} disabled={!isActiveButton} onClick={toggleReverseModal}>
          <img src={undo} alt='confirm' className={styles.icon} />
          Aufträge wiederherstellen {isActiveButton && `(${totalAmount})`}
        </button>
      )}
    </div>
  );
};

export default observer(ProcessOrder);
